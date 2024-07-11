import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

export function AiGeneratedPost() {
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDescription = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Sending request with prompt:', prompt);
      const response = await axios.post('http://localhost:3000/api/prompt-ai-generate', { prompt });
      const generatedDescription = response.data;
      console.log('Received response:', generatedDescription);
      setDescription(generatedDescription);
    } catch (error) {
      console.error('Error generating description:', error);
      setError('Failed to generate description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl space-y-6">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Blog Post Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your blog post title"
              className="w-full"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Button onClick={handleGenerateDescription} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Description'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <Textarea
              id="description"
              rows={4}
              value={description}
              placeholder="Your AI-generated description will appear here"
              className="w-full"
              readOnly
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyDescription}
              >
                <CopyIcon className="h-4 w-4" />
                <span className="sr-only">Copy Description</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
