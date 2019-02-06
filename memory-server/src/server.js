import Server from 'socket.io';

const PORT = process.env.NODE_PORT || 8090;

export default function startServer(store) {
  const io = new Server().attach(PORT);

  console.log(store);
};