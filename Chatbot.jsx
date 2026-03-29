import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ userData, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your MoneyMentor AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          user_data: userData || {},
          language: language || 'en'
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having difficulty connecting to my AI logic. Please ensure the backend is running." 
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <button className={`chat-toggle ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window glass-card animate-fade-in">
          <div className="chat-header">
            <div className="header-info">
              <div className="bot-avatar">
                <Bot size={20} color="#00ec97" />
              </div>
              <div className="header-text">
                <h4>MoneyMentor AI</h4>
                <span>Online now</span>
              </div>
            </div>
          </div>

          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.role}`}>
                <div className="msg-icon">
                  {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="msg-content">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-bubble assistant">
                <div className="msg-content typing">...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Ask anything about finance..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 2000;
        }

        .chat-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-color);
          color: var(--primary-bg);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 32px 0 rgba(0, 236, 151, 0.4);
          transition: all 0.3s ease;
        }

        .chat-toggle:hover {
          transform: scale(1.1);
        }

        .chat-toggle.active {
          background: #ff4d4d;
          box-shadow: 0 8px 32px 0 rgba(255, 77, 77, 0.4);
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid var(--glass-border);
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(0, 236, 151, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-text h4 {
          font-size: 0.95rem;
          margin: 0;
        }

        .header-text span {
          font-size: 0.75rem;
          color: var(--accent-color);
        }

        .messages-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-bubble {
          display: flex;
          gap: 8px;
          max-width: 85%;
        }

        .message-bubble.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .msg-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .message-bubble.assistant .msg-icon {
          background: rgba(0, 236, 151, 0.2);
          color: var(--accent-color);
        }

        .msg-content {
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .message-bubble.user .msg-content {
          background: var(--accent-color);
          color: var(--primary-bg);
        }

        .chat-input-area {
          padding: 15px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 10px;
        }

        .chat-input-area input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-size: 0.9rem;
          outline: none;
        }

        .send-btn {
          background: transparent;
          color: var(--accent-color);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
        }

        .send-btn:disabled {
          color: var(--text-secondary);
        }

        @media (max-width: 480px) {
          .chat-window {
            width: 300px;
            height: 400px;
            right: -20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
