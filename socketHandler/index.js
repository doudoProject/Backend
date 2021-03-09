function getCoupleId(socket){
  return socket.user.couple.coupleid;
}

function joinRoom(socket){
  let myCoupleId = getCoupleId(socket);
  socket.join(myCoupleId);
}

function connectUser(socket,user){
  socket.user = user.info;
}

function isSocketUser(socket){
  return (socket.user !== null && socket.user !== undefined)
}

const socketHandler = 
  (socket)=>{
    console.log('\u001b[32m+ \u001b[0m'+ socket.handshake.headers['x-real-ip']);

    socket.on('disconnect', () => {
      if(isSocketUser(socket)) // Check if it is registered user
        console.log('\u001b[31m- \u001b[0m' + socket.user.name + '(' + socket.user.userid + ')')
      console.log('\u001b[31m- \u001b[0m' + socket.handshake.headers['x-real-ip']);
    })

    socket.on('userconnect',user=>{
      console.log('\u001b[32m+ \u001b[0m' + user.info.name + '(' + user.info.userid + ')');

      connectUser(socket,user);
      joinRoom(socket);
    })

    socket.on('addtodo',todo=>{
      socket.broadcast.to(getCoupleId(socket)).emit('todoadded',todo)
    })
    socket.on('deletetodo',id=>{
      socket.broadcast.to(getCoupleId(socket)).emit('tododeleted',id)
    })
    socket.on('modifytodo',todo=>{
      socket.broadcast.to(getCoupleId(socket)).emit('todomodified',todo)
    })

    // TODO : Chat read notifier
    socket.on('chat',chat=>{
      socket.broadcast.to(getCoupleId(socket)).emit('chatadded',chat)
    })
  }

module.exports = socketHandler;