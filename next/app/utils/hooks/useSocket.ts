import { io, Socket } from 'socket.io-client';

function createSocket(namespace: string) {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
  return io(`${url}/${namespace}`);
}

export interface ChatFooterProps {
  socket: Socket;
}

export default createSocket;
