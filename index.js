// app.js
import express from 'express';

const app = express();
let posts = []; // In-memory storage for posts

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home Route - Display all posts
app.get('/', (req, res) => {
    console.log("Rendering index with posts:", posts); // Debugging line
    res.render('index', { posts });
});

// New Post Route - Display form to create a new post
app.get('/new', (req, res) => {
    res.render('newPost');
});

// Handle New Post Submission
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

// Edit Post Route - Display form to edit a post
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('editPost', { post, id });
});

// Handle Edit Post Submission
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    if (posts[id]) {
        posts[id] = { title: req.body.title, content: req.body.content };
    }
    res.redirect('/');
});

// Delete Post
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (posts[id]) {
        posts.splice(id, 1);
    }
    res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Blog app listening on port ${PORT}!`);
});
