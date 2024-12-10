import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Copy, Users } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import toast from 'react-hot-toast';

export const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [message, setMessage] = useState('');
  const [username] = useState(() => localStorage.getItem('username') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isConnected, sendMessage } = useWebSocket(roomId!, username);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const copyRoomLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success('Room link copied to clipboard!');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Chat Room</h1>
          <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={copyRoomLink}
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <Copy className="h-4 w-4" />
            <span>Share Room</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.isCurrentUser
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900 shadow-sm'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {msg.isCurrentUser ? 'You' : msg.sender}
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};