import React, { useEffect, useState, useRef } from "react";
import "./UserList.css";
import axios from "axios";
import { BASE_URL } from "../../../config"; // Import the base URL
// import UserGallery from '../../Gallery/UserGallery';
import './SlackFeed.css';

const SlackFeed = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Get the token from storage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      // Add the token to the request headers
      await axios.post(
        `${BASE_URL}/api/Slack/send`, 
        { Text: message },
        { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-list">
      <h1>SlackFeed</h1>
      
      <div className="slack-feed-container">
        <form onSubmit={handleSubmit} className="slack-message-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={handleChange}
              disabled={loading}
              className="message-input"
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={loading || !message.trim()}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Message sent successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default SlackFeed;
