import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Shield, Zap, Share2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">SecureChat</span>
          </div>
          <button
            onClick={() => navigate('/create-room')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Create Room
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Secure, Private, Real-Time Chat
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect instantly with end-to-end encrypted messaging. No registration required.
            Your privacy is our priority.
          </p>
          <button
            onClick={() => navigate('/create-room')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition-colors"
          >
            Start Chatting Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Zap className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Rooms</h3>
            <p className="text-gray-600">Create a room in seconds. No registration or setup required.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Shield className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your messages are encrypted and never stored on our servers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Share2 className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600">Share room links instantly with anyone you want to chat with.</p>
          </div>
        </div>
      </div>
    </div>
  );
};