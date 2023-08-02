export const appMessages = (socket, socketIo) => {
  let users = [];
  // console.log("now socket are connected ");
  socket.on("connect", async () => {
    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId == userId) &&
        users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
      users = users?.filter((user) => user?.socketId != socketId);
    };

    const getUser = (userId) => {
      let user = users.find((user) => user.userId == userId);
      return user;
    };

    socket.on("addUser", (userId) => {
      console.log("userId", userId);
      addUser(userId, socket.id);
      socketIo.emit("getUsers", "asdsd");
    });

    
  });
};
