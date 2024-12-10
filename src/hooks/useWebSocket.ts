import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/chat';

export const useWebSocket = (roomId: string, username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?roomId=${roomId}&username=${encodeURIComponent(username)}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, {
        ...message,
        isCurrentUser: message.sender === username
      }]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [roomId, username]);

  const sendMessage = (content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        content,
        type: 'message'
      }));
    }
  };

  return { messages, isConnected, sendMessage };
};