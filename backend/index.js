const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const geminiPromptRouter = require("./routers/geminiPromptRouter.js");
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


require("./geminiApi")

// MongoDB connection
const mongoURI = 'mongodb+srv://sivasish48:B5tgYiA3uo0i7E6k@blogpost.dbdlngu.mongodb.net/'; // Replace with your MongoDB connection string
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
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Middleware

app.use(express.json());
app.use(cors({
  origin:["https://fusion-with-ai-frontend.vercel.app"],
  methods:["GET", "POST", "PUT"],
  credentials: true
}));



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
  const { title, description, imageUrl } = req.body;
  if (!title || !description) {
    return res.status(400).send('Title and description are required.');
  }

  try {
    // Save blog post to MongoDB
    const newBlogPost = new BlogPost({
      title,
      description,
      imageUrl, // Save imageUrl
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

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send('Failed to fetch the post.');
  }
});


// For ai post generation
app.use("/api", geminiPromptRouter);


app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;

  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, description, imageUrl },
      { new: true } // This option returns the updated document
    );

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send('Failed to update the blog post.');
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
