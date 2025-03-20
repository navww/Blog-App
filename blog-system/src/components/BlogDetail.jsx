import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';

const BlogDetail = () => {
  // Get the blog ID from URL params
  const { id } = useParams();
  const { user } = useAuth();
  
  // State management for blog post and UI
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch blog post details, comments, and country info when component mounts
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // Fetch blog post and comments in parallel
        const [blogData, commentsData] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ]);
        
        setBlogPost(blogData.data);
        setPostComments(commentsData.data);
        
        // Get some random country data for demo purposes
        const countryData = await axios.get('https://restcountries.com/v3.1/name/usa');
        setCountryData(countryData.data[0]);
        
        // Load saved like status from localStorage
        const savedLikeCount = JSON.parse(localStorage.getItem(`blog_likes_${id}`)) || 0;
        const savedLikeStatus = localStorage.getItem(`blog_liked_${id}`) === 'true';
        setLikeCount(savedLikeCount);
        setHasLiked(savedLikeStatus);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading blog data:', err);
        setErrorMessage('Oops! Something went wrong while loading the blog post.');
        setIsLoading(false);
      }
    };

    loadBlogData();
  }, [id]);

  // Handle like/unlike functionality
  const handleLikeClick = () => {
    if (hasLiked) {
      // User is unliking the post
      const updatedLikes = likeCount - 1;
      setLikeCount(updatedLikes);
      setHasLiked(false);
      localStorage.setItem(`blog_likes_${id}`, updatedLikes);
      localStorage.setItem(`blog_liked_${id}`, 'false');
      setNotification({ message: 'Post unliked!', type: 'success' });
    } else {
      // User is liking the post
      const updatedLikes = likeCount + 1;
      setLikeCount(updatedLikes);
      setHasLiked(true);
      localStorage.setItem(`blog_likes_${id}`, updatedLikes);
      localStorage.setItem(`blog_liked_${id}`, 'true');
      setNotification({ message: 'Post liked!', type: 'success' });
    }

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (user && commentText.trim()) {
      const newComment = {
        id: postComments.length + 1,
        postId: parseInt(id),
        name: user.email,
        email: user.email,
        body: commentText
      };
      setPostComments([...postComments, newComment]);
      setCommentText('');
      setNotification({ message: 'Comment posted successfully!', type: 'success' });
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="container blog-detail">
        <div className="blog-article">
          <div className="skeleton skeleton-title" style={{ width: '60%', marginBottom: '2rem' }}></div>
          <div className="skeleton skeleton-text" style={{ marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '90%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '85%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '95%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '90%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '85%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '95%', marginBottom: '1rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%', marginBottom: '1rem' }}></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (errorMessage) return <div className="container error-message">{errorMessage}</div>;
  
  // Show not found state
  if (!blogPost) return <div className="container">Blog post not found</div>;

  return (
    <div className="container blog-detail">
      {/* Show notification toast if exists */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Main blog post content */}
      <article className="blog-article">
        <h1 className="blog-title-large">{blogPost.title}</h1>
        
        {/* Like button section */}
        <div className="like-section">
          <button 
            className={`like-button ${hasLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label={hasLiked ? 'Unlike post' : 'Like post'}
          >
            {hasLiked ? '❤️' : '🤍'}
          </button>
          <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        </div>

        {/* Blog post content */}
        <div className="blog-content">
          {blogPost.body}
        </div>
        
        {/* Related country info section */}
        {countryData && (
          <div className="country-info">
            <h3>Related Country Info:</h3>
            <div className="country-header">
              <span className="country-flag">{countryData.flag}</span>
              <span className="country-name">{countryData.name.common}</span>
            </div>
            <p>Capital: {countryData.capital?.[0]}</p>
            <p>Population: {countryData.population?.toLocaleString()}</p>
          </div>
        )}
      </article>

      {/* Comments section */}
      <section className="comments-section">
        <h2 className="comments-title">Comments</h2>
        
        {/* Comment form for logged-in users */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
              placeholder="Write a comment..."
              rows="3"
            />
            <button
              type="submit"
              className="btn btn-primary"
            >
              Post Comment
            </button>
          </form>
        )}

        {/* Comments list */}
        <div className="comments-list">
          {postComments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-author">{comment.name}</p>
              <p className="comment-content">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail; 