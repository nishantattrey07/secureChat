import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './components/LandingPage';
import { ChatRoom } from './components/ChatRoom';
import { UsernameModal } from './components/UsernameModal';
import { JoinRoom } from './components/JoinRoom';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<UsernameModal />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
        <Route path="/join-room/:roomId" element={<JoinRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;