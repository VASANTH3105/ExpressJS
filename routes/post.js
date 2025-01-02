//const express = require("express");
import express from 'express';

const router = express.Router();

let post = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

//Get all post

router.get("/", (req, res) => {
  //res.send(post); can be also used
  console.log(req.query);

  //setting limit
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    //By caution on SQL Injection in Query parameter
    res.status(200).json(post.slice(0, limit));
  } else {
    res.status(200).json(post);
  }
  res.json(post);
  //you can hit this end point to your react application to serve data
});


//Here you don't have  access to app only way to handle this to use Router
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postFind = post.find((post) => post.id === id);
  if (!postFind) {
    //Just little optimization
    return res
      .status(404)
      .json({ message: `A post with ${id} is not found...!` });
  } else {
    res.status(200).json(postFind);
  }
});

// Create a post
router.post('/', (req, res) => {
    const newPost = {
        id: post.length + 1,
        title: req.body.title
    };

    // Check if the title is provided
    if (!newPost.title) {
        return res.status(400).json({ message: 'Title is required...!' });
    }

    // Add the new post to the array
    post.push(newPost);

    // Respond with the updated post list
    res.status(201).json(post);
});

//We are using common Js so use module.exports
export default router;
//module.exports = router;