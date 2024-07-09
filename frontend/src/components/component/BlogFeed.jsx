import { useEffect, useState } from 'react';

const BlogFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              width={600}
              height={40}
              className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <h3
                className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
              >
                {post.title}
              </h3>
              <div 
                className="mt-2 text-sm text-muted-foreground" 
                dangerouslySetInnerHTML={{ __html: post.description }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
