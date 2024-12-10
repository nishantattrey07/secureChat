import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './components/LandingPage';
import { ChatRoom } from './components/ChatRoom';
import { UsernameModal } from './components/UsernameModal';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<UsernameModal />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;