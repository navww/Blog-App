import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setBlogs(response.data.slice(0, 20)); // Limiting to 20 posts for demo
        setLoading(false);
      } catch {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container blog-list">
        <div className="search-bar-container">
          <div className="skeleton" style={{ height: '40px', width: '100%' }}></div>
        </div>
        <div className="blog-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="blog-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="container error-message">{error}</div>;

  return (
    <div className="container blog-list">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search blogs..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="blog-grid">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <h2 className="blog-title">
              {blog.title}
            </h2>
            <p className="blog-excerpt">
              {blog.body.substring(0, 100)}...
            </p>
            <Link
              to={`/blog/${blog.id}`}
              className="read-more"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="container">
          No blogs found matching your search.
        </div>
      )}
    </div>
  );
};

export default BlogList; 