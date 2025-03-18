import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        navigate('/');
    };
    const handleBookRoomClick = () => {
        navigate('/meetingroomcalendar');
      };
    const handleChatFeedClick = () => {
        navigate('/maintenance/slackfeed');
    };


    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome, User! You have access to this page.</p>
            <button onClick={handleBookRoomClick}>Book a Room</button>
            <button onClick={handleChatFeedClick}>ChatFeed</button> 
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserPage;