import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { AuthData } from "@/utils/AuthWrapper.jsx";
import Skeleton from '@/components/component/Skeleton';
import { useTheme } from "@/components/component/theme-provider"; // Import useTheme

const extractImageAndDescription = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const img = div.querySelector('img');
  const imgUrl = img ? img.src : '';
  if (img) img.remove();
  return { imgUrl, description: div.innerHTML };
};

const SinglePost = () => {
  const { user } = AuthData();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { imgUrl, description } = extractImageAndDescription(data.description);
        setPost({ ...data, imgUrl, description });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <article className="space-y-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={post.imgUrl || "/placeholder.svg"}
            alt="Featured Image"
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground">
            Published on <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString()}</time>
          </p>
        </div>
        <div className={`prose ${theme === "dark" ? "prose-invert" : "prose-gray"}`}>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
   
        {user.isAuthenticated && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => navigate(`/editpost/${id}`)}>Edit Post</Button>
          </div>
        )}
      </article>
    </div>
  );
};

export default SinglePost;
