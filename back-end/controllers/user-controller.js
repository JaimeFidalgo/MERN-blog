const User = require('../models/User');
const bcrypt = require("bcryptjs"); //libreria para encriptar contraseñas y que no se vean en la respuesta del servidor


 const getAllUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find();

    } catch(err) {
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No Users found"})
    }
    return res.status(200).json({users})
}

const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({email})

    }catch(err) {
        console.log(err)
    }
    if(existingUser){
        return res.status(404).json({message: "User already exists. Log In instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });

   
    try{
       await user.save();
    }catch(err){
        console.log(err)
    }
    return res.status(200).json({user})
}

const login = async (req, res, next) => {
    const { email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})

    }catch(err) {
        console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message: "Couldn't find user"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(404).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message: "Successfully Logged In"})

}

module.exports = {
    getAllUsers,
    signup,
    login
}