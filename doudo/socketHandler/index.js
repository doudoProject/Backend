let rooms=[];
let users=[];

function getCoupleId(socket){
  return users[socket.id].user.couple.coupleid;
}

function getCoupleIdByUser(user){
  return user.info.couple.coupleid;
}

function joinRoom(socket,user){
  let myCoupleId = getCoupleIdByUser(user);
  if(!rooms[myCoupleId]) rooms[myCoupleId]=[];
  rooms[myCoupleId].push(socket.id);
  socket.join(myCoupleId);
}

function leaveRoom(socket){
  let myCoupleId = getCoupleId(socket);
  rooms[myCoupleId] = rooms[myCoupleId].filter(socketid=>{return socketid !== socket.id})
  socket.leave(myCoupleId);
}

function connectUser(socket,user){
  users[socket.id] = {user: user.info, socketid:socket.id};
}

function disconnectUser(socket){
  users = users.filter(user=>{user.socketid !== socket.id})
}

function isSocketSignedIn(socket){
  return (users[socket.id] !== null && users[socket.id] !== undefined);
}

const socketHandler = 
  (socket)=>{
    console.log('+ '+ socket.handshake.headers['x-real-ip']);

    socket.on('disconnect', () => {
      // TODO: delete socket user from users and rooms array
      if(isSocketSignedIn(socket)){ // Check if it is signed-in user
        leaveRoom(socket);
        disconnectUser(socket);
      }
      console.log('- ' + socket.handshake.headers['x-real-ip']);
    })

    // TODO : register socket user using frontend eventlistener(connect)
    socket.on('userconnect',user=>{
      console.log('registed user connected: ');
      console.log(user);
    
      connectUser(socket,user);
      joinRoom(socket,user);
    
      // DEBUG
      console.log('=========debug============')
      console.log(users)
      console.log(rooms)
      console.log('=========debug end============')
    })

    socket.on('addtodo',todo=>{
      // console.log('emit to couple('+users[socket.id].user.couple.coupleid+') that ' + todo);
      socket.broadcast.to(users[socket.id].user.couple.coupleid).emit('todoadded',todo)
    })

    // TODO : Chat read notifier
    socket.on('chat',chat=>{
      socket.broadcast.to(users[socket.id].user.couple.coupleid).emit('chatadded',chat)
    })
  }

module.exports = socketHandler;