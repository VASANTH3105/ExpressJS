const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

// || 8000 is a fallback port if the environment variable is not set
// will not use by default will end up with FALL BACK state you have to explictly mention in package.json
// app is used in all to reute, create middleware, etc

//setup static folder
app.use(express.static(path.join(__dirname, "public"))); // __dirname is a global variable that gives the current directory name
// path.join is used to join the current directory name with the public folder
// express.static is used to serve static files such as images, css, and javascript files
// You no need to create routing for static files, express will automatically serve them
//All you need to create project.html put URL project it will take care  of everything

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
// added a callback function to the listen method to confirm that the server is running

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

let post = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

//Get all post
app.get("/api/post", (req, res) => {
  //res.send(post); can be also used
  console.log(req.query);

  //setting limit
  const limit = parseInt(req.query.limit);
  if(!isNaN(limit) && limit > 0) {
    //By caution on SQL Injection in Query parameter
    res.status(200).json(post.slice(0, limit));
  } else {
    res.status(200).json(post);
  }
  res.json(post);
  //you can hit this end point to your react application to serve data
});

/*
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
app.get('/api/post/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postFind = post.find((post) => post.id === id);
    if(!postFind) {
        res.status(404).json({ message: `A post with ${id} is not found...!`});
    } else {
        res.status(200).json(postFind);
    }
})
