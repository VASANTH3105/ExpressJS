const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

// || 8000 is a fallback port if the environment variable is not set
// will not use by default will end up with FALL BACK state you have to explictly mention in package.json
// app is used in all to reute, create middleware, etc

//setup static folder
app.use(express.static(path.join(__dirname, 'public'))); // __dirname is a global variable that gives the current directory name
// path.join is used to join the current directory name with the public folder
// express.static is used to serve static files such as images, css, and javascript files
// You no need to create routing for static files, express will automatically serve them
//All you need to create project.html put URL project it will take care  of everything 

app.listen(port, () => {
    try {
        console.log(`Server is running on port ${port}`);
    } catch(err) {
        console.log(err);
    }
})
// added a callback function to the listen method to confirm that the server is running

//get endpoint first argument is the path, second argument is a callback function with 
//two parameters, req and res
app.get('/', (req, res) => {
    //meny methods can be used here
    //send method is used to send a response back to the client
    //res.send({message: 'Hello world...!'}); //By defauld gets stringify
    res.send('<h2>Hello World</h2>')
    //NOTE: a request returns only can handle only single response not two res.send
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
    //a way to load HTML files for single file this is ok for more large files you have to use middleware
})
//This res object has a method calld dend file


let post = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'}
];
app.get('/api/post', (req, res) => {
    //res.send(post); can be also used 
    res.json(post);
    //you can hit this end point to your react application to serve data
})
