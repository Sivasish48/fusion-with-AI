// src/Pages/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import Skeleton from "@/components/component/Skeleton";
const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://fusion-with-ai-backend.vercel.app/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://fusion-with-ai-backend.vercel.app/upload_image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.link;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageFiles = Array.from(description.matchAll(/<img src="([^"]+)"[^>]*>/g)).map(match => match[1]);
    let updatedDescription = description;
    const uploadPromises = imageFiles.map(async (src) => {
      const file = await fetch(src).then(res => res.blob());
      const uploadedUrl = await handleImageUpload(file);
      updatedDescription = updatedDescription.replace(src, uploadedUrl);
    });
    await Promise.all(uploadPromises);

    const data = {
      title,
      description: updatedDescription,
    };

    try {
      const response = await fetch(`https://fusion-with-ai-backend.vercel.app/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update the blog post.");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  if (!post) return <Skeleton />;

  return (
    <form className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" onSubmit={handleSubmit}>
      <div className="space-y-8 lg:space-y-12">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Edit Your Masterpiece
          </h1>
          <p className="mt-4 text-muted-foreground text-lg md:text-xl">
            Update your captivating blog post.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Title</h2>
            <p className="text-muted-foreground">Update your compelling title.</p>
            <Input type="text" value={title} className="w-full" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Description</h2>
            <p className="text-muted-foreground">Update the description of your blog post.</p>
            <FroalaEditorComponent
              tag="textarea"
              className="w-full min-h-[150px]"
              model={description}
              onModelChange={(content) => setDescription(content)}
              config={{ imageUpload: false }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
            Update Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
