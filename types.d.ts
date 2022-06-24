/// <reference types="redux-persist" />

import { Status } from '@/config/status';

declare module 'redux-persist/lib/storage/createWebStorage';
declare module 'redux-persist/integration/react';

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  path: string;
  active?: boolean;
  onClick?(): void;
}

type ChatUser = {
  id: string;
  username: string;
  password: string;
  status: Status;
  email: string;
  room_id: string;
  created_at: Date;
  updated_at: Date;
  uid: string;
};

type Room = {
  users: ?User[];
  id: string;
  name: string;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
  uid: string;
};

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  room_id: string;
  created_at: Date;
  uid: string;
};

type ServerMessage = {
  content: string;
  sender: string;
};
