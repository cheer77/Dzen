export const initSocket = (io) => {
  let usersCount = 0;

  io.on('connection', (socket) => {
    usersCount += 1;
    io.emit('usersCount', usersCount);

    socket.on('disconnect', () => {
      usersCount = Math.max(0, usersCount - 1);
      io.emit('usersCount', usersCount);
    });
  });
};
