import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMentions, setShowMentions] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesContainerRef = useRef(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    };
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
      const value = event.target.value;
      if (value.endsWith('@')) {
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    };
  
    const handleSendMessage = () => {
      if (message.trim() !== '') {
        const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
        const newMessage = { user: randomUser, text: message, likes: 0 };
        setMessages([newMessage, ...messages]);
        setMessage('');
      }
    };
  
    const handleLike = (index) => {
      const updatedMessages = [...messages];
      updatedMessages[index].likes += 1;
      setMessages(updatedMessages);
    };
  
    const handleMentionSelect = (username) => {
      setMessage(message.slice(0, -1) + username + ' ');
      setShowMentions(false);
    };
    const handleEmojiSelect = (emoji, event) => {
        setMessage(message + emoji.emoji);
        setShowEmojiPicker(false);
      };
      
      
  
    return (
      <div>
        <header>
          <h1>Chat App</h1>
          <p>lets do it bro!</p>
        </header>
        <div
          ref={messagesContainerRef}
          className="container"
        >
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.user}:</strong> {msg.text}
              <button onClick={() => handleLike(index)}>Like ({msg.likes})</button>
            </div>
          ))}
        </div>
        <div className="input">
          <input 
            type="text" 
            value={message} 
            onChange={handleMessageChange} 
            placeholder="Type your message..."
          />
           <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
          {showMentions && (
            <div>
              {user_list.map((user, index) => (
                <div key={index} onClick={() => handleMentionSelect(user)}>{user}</div>
              ))}
            </div>
          )}
            {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        )}
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  };
  
  
  