import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const JoinRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      localStorage.setItem('username', username.trim());
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.log(error);
      toast.error('Failed to join chat room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Joining Room...' : 'Join Chat'}
          </button>
        </form>
      </div>
    </div>
  );
};