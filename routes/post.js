//const express = require("express");
import express from "express";
import {
  getPost,
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

//Get all post
router.get("/", getPosts);

//Here you don't have  access to app only way to handle this to use Router
router.get("/:id", getPost);

// Create a post
router.post("/", createPost);

// Update POST
router.put("/:id", updatePost);

//Delete POST
router.delete("/:id", deletePost);

//We are using common Js so use module.exports
export default router;
//module.exports = router;
