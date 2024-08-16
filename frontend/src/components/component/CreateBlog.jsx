import { useState } from "react";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { useNavigate } from "react-router-dom";
import { Sparkles } from 'lucide-react';
import { useTheme } from "@/components/component/theme-provider"; // Import useTheme

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

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

    const data = { title, description: updatedDescription };

    console.log("Data being sent to backend:", JSON.stringify(data)); 
    fetch("https://fusion-with-ai-backend.vercel.app/submit_blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error) });
        }
        return response.json();
      })
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error.message); 
      });
      navigate("/home");
  };

  return (
    <form
      className={`w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 lg:space-y-12">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Create Your Next Masterpiece
          </h1>
          <p className="mt-4 text-muted-foreground text-lg md:text-xl">
            Craft a captivating blog post that resonates with your audience.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Title</h2>
            <p className="text-muted-foreground">Craft a compelling title that grabs your reader's attention.</p>
            <Input type="text" placeholder="Enter your blog post title" className="w-full" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Description</h2>
            <p className="text-muted-foreground">Provide the description of your blog post.</p>
            <FroalaEditorComponent
              tag='textarea'
              className="w-full min-h-[150px] dark:bg-gray-900 dark:text-white "
              onModelChange={(content) => setDescription(content)}
              config={{
                imageUpload: false,
                theme: theme === "dark" ? "eg-dark-theme" : "default" // Set Froala theme
              }}
            />
          </div>
        </div>
        <div className="animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold">Your Blog Should Include :</h2>
          <p className="mt-4 text-muted-foreground text-lg md:text-xl">
            A captivating summary that highlights the key points of your blog post with the below points.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300 dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Engaging Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Craft content that captivates your audience and keeps them engaged.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300 dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Thoughtful Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Provide valuable insights that your readers can apply to their own lives.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300 dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Visually Appealing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enhance your blog post with visually stunning images and graphics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
            Publish this blog
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 mr-6" onClick={()=>navigate("/aigeneratedpost")} >
            Generate From AI
            <Sparkles />
          </Button>
        </div>
      </div>
    </form>
  );
}
