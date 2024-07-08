import { useState } from "react";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';


export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description);
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
            <FroalaEditorComponent tag='textarea' className="w-full min-h-[150px]" onModelChange={(content) => setDescription(content)} />
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
