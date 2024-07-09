const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = 'mongodb+srv://sivasish48:8slBZC4zuBOWATqZ@cluster0.qxlxqj2.mongodb.net/'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the BlogPost model
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Add imageUrl to schema
  date: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle image uploads
app.post('/upload_image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ link: imageUrl });
});

// Route to handle blog post submissions
app.post('/submit_blog', async (req, res) => {
  const { title, description, imageUrl } = req.body; // Include imageUrl
  if (!title || !description || !imageUrl) {
    return res.status(400).send('Title and description are required.');
  }

  try {
    // Save blog post to MongoDB
    const newBlogPost = new BlogPost({
      title,
      description,
      imageUrl, // Save the image URL
    });

    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(500).send('Failed to save the blog post.');
  }
});


app.get('/api/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).send('Failed to fetch blog posts.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
