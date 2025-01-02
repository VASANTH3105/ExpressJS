let post = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res, next) => {
  //res.send(post); can be also used
  console.log(req.query);

  //setting limit
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    //By caution on SQL Injection in Query parameter
    return res.status(200).json(post.slice(0, limit));
  }
  res.status(200).json(post);

  //res.json(post);
  //you can hit this end point to your react application to serve data
};

// @desc Get single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const postFind = post.find((post) => post.id === id);
  if (!postFind) {
    //Just little optimization
    /*
      return res
        .status(404)
        .json({ message: `A post with ${id} is not found...!` });
        */
    //Custom Error Handler
    const error = new Error(`A post with ${id} is not found...!`);
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(postFind);
  }
};

// @desc Create post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const newPost = {
    id: post.length + 1,
    title: req.body.title,
  };

  // Check if the title is provided
  if (!newPost.title) {
    //return res.status(400).json({ message: 'Title is required...!' });
    const error = new Error(`Please include a title`);
    error.status = 404;
    return next(error);
  }

  // Add the new post to the array
  post.push(newPost);

  // Respond with the updated post list
  res.status(201).json(post);
};

// @desc Update post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const postFind = post.find((post) => post.id === id);

  if (!postFind) {
    return res
      .status(404)
      .json({ message: `A post with id ${id} is not found...!` });
  }

  // Update the title from the request body
  if (req.body.title) {
    postFind.title = req.body.title;
  }

  res.status(200).json(post);
};
// @desc Delete post
// @route DELETE /api/posts/:id

export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const postFind = post.find((post) => post.id === id);

  if (!postFind) {
    return res
      .status(404)
      .json({ message: `A post with id ${id} is not found...!` });
  }

  post = post.filter((post) => post.id !== id);
  res.status(200).json(post);
};
