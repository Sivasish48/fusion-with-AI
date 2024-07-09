import { useState } from "react";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:3000/upload_image", { // Your backend URL
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.link; // Return the link to the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather all image files from the description content
    const imageFiles = Array.from(description.matchAll(/<img src="([^"]+)"[^>]*>/g)).map(match => match[1]);

    let updatedDescription = description;

    // Upload each image and replace the src with the uploaded URL
    const uploadPromises = imageFiles.map(async (src) => {
      const file = await fetch(src).then(res => res.blob());
      const uploadedUrl = await handleImageUpload(file);
      updatedDescription = updatedDescription.replace(src, uploadedUrl);
    });

    await Promise.all(uploadPromises);

    // Now send title and updated description to your backend
    const data = {
      title,
      description: updatedDescription,
    };

    console.log("Data being sent to backend:", JSON.stringify(data)); // Add debugging log

    fetch("http://localhost:3000/submit_blog", { // Your backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
        console.error("Error:", error.message); // Add error message for debugging
      });
  };

  return (
    <form className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8" onSubmit={handleSubmit}>
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
              className="w-full min-h-[150px]"
              onModelChange={(content) => setDescription(content)}
              config={{
                imageUpload: false, // Disable built-in image upload
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
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              <CardHeader>
                <CardTitle>Engaging Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Craft content that captivates your audience and keeps them engaged.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              <CardHeader>
                <CardTitle>Thoughtful Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Provide valuable insights that your readers can apply to their own lives.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
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
        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
            Publish this blog
          </Button>
        </div>
      </div>
    </form>
  );
}
