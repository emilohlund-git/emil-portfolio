import { SOCKET_URL } from '@/config/socket';
import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
});
export const SocketContext = React.createContext({} as Socket);
