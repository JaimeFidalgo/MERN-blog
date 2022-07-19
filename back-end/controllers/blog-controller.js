const {  mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");


const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({ message: "Not blogs found" })
    }
    return res.status(200).json({ blogs })
}

const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user)
    } catch(err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(404).json({message: "Unabled to find user with this id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession(); //para hacer transacciones entre dos colecciones diferentes
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(404).json({message: err})
    }
    return res.status(200).json(blog )

}

const updateBlog = async (req, res, next) => {

    const { title, description } = req.body;
    const blogId = req.params.id
    let blog
    blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description

    })
    try{

    } catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message: "unable to update Blog"})
    }
    return res.status(200).json({
        blog
    })
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id)

    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({
            message:"Blog not found"
        })
    }
    return res.status(200).json({blog})
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(id)
    }catch(err){
        console.log(err)
    }
    if (!blog){
        return res.status(404).json({message:"Unable to delete"})
    }
    return res.status(200).json({message: "Succesfully deleted"})
}

module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    getById,
    deleteBlog

}