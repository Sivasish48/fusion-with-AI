// src/Pages/BlogFeed.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@/components/component/Skeleton';
const BlogFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://fusion-with-ai-backend.vercel.app/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        // console.error('Error fetching blog posts:', error);
        <Skeleton />
        setError(error);
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []); // This empty dependency array means this effect runs once when the component mounts

  if (loading) return <Skeleton />;
  if (error) return  <p>Error loading posts: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id} className="group relative overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-lg">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>
                <div className="mt-2 text-sm text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: post.description }}></div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {post.summary}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
