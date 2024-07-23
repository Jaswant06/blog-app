const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage for blog posts
let posts = [];

// Routes will be added here

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});

// ... (previous code remains the same)

// Home route - display all posts
app.get('/', (req, res) => {
    res.render('home', { posts });
  });
  
  // Create post route - display form
  app.get('/create', (req, res) => {
    res.render('create');
  });
  
  // Create post route - handle form submission
  app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
  });
  
  // Edit post route - display form
  app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      res.render('edit', { post });
    } else {
      res.redirect('/');
    }
  });
  
  // Edit post route - handle form submission
  app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      posts[index] = { ...posts[index], title, content };
    }
    res.redirect('/');
  });
  
  // Delete post route
  app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
  });
  
  // ... (server listening code remains the same)