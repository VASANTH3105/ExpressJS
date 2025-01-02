// const express = require("express");
// const path = require("path");
// const post = require('./routes/post');
const port = process.env.PORT || 8000;
const app = express();

//Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);


//AFTER Changing "type": "module" in package.json
//you can use import instead of require
import express from "express";
import path from "path";
import { fileURLToPath } from "url"; 
import post from "./routes/post.js"; //if it's a file you have to use it's extension
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
// || 8000 is a fallback port if the environment variable is not set
// will not use by default will end up with FALL BACK state you have to explictly mention in package.json
// app is used in all to reute, create middleware, etc

//Middleware - functions that have access to the request object, the response object, and the next middleware function in the application’s request-response cycle.
app.use(express.json()); // This allows app to post json data to it
app.use(express.urlencoded({ extended: false })); // This allows app to post url encoded data to it

//Logger middleware
app.use(logger);

//setup static folder
app.use(express.static(path.join(__dirname, "public"))); // __dirname is a global variable that gives the current directory name
// path.join is used to join the current directory name with the public folder
// express.static is used to serve static files such as images, css, and javascript files
// You no need to create routing for static files, express will automatically serve them
//All you need to create project.html put URL project it will take care  of everything

/*
//get endpoint first argument is the path, second argument is a callback function with
//two parameters, req and res
app.get("/", (req, res) => {
  //meny methods can be used here
  //send method is used to send a response back to the client
  //res.send({message: 'Hello world...!'}); //By defauld gets stringify
  res.send("<h2>Hello World</h2>");
  //NOTE: a request returns only can handle only single response not two res.send
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
  //a way to load HTML files for single file this is ok for more large files you have to use middleware
});
//This res object has a method calld dend file

*/

/*
In this you can yous app. because you have access to app in this file
//Get single post
app.get("/api/post/:id", (req, res) => {
  //id will basically an object and be in string type
  const id = parseInt(req.params.id);
  //res.status(200).json(post.filter((postfilter) => postfilter.id === id));
  const postfind = post.find((post) => post.id === id);

  if(!postfind) {
    res.status(404).json({message: `A post with ${id} is not found...!`});
  } else {
    res.status(200).json(postfind);
  }
});
*/

//After importing Reoutes
app.use("/api/post", post);
//If you are using //api/post you need not to use this end point in Routes

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
// added a callback function to the listen method to confirm that the server is running
