export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
  isCurrentUser: boolean;
}

export interface User {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  users: User[];
}