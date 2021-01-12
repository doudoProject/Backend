const app = require("../app");

app.io.on('add todo',socket=>{
    console.log('add todo' + socket.data)
})