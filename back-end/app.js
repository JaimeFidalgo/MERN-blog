const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${NODE_ENV}`
});






mongoose.connect(`mongodb+srv://${process.env.ADMIN}:${process.env.ATLASS_KEY}@cluster0.ii4yavb.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log("connected to the database"))
.catch(error => console.log(error))

//Middlewares
app.use(express.json())

//Routes
app.use( "/api/users", router)
app.use("/api/blogs", blogRouter)


//End-Points



app.listen(5000, () => {
    console.log("server listening on port 5000")
})