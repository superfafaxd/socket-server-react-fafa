
//Servidor de express
const express = require('express');
const http = require('http');//servidor de sockets
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //conf sockets
        this.io = socketio(this.server, { /* configuracioners */ });

    }

    middlewares() {
        //Despegar el directorio publico
        this.app.use(express.static( path.resolve( __dirname, '../public') ));
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute() {
        
        this.middlewares();

        //inicializar sockets
        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('server corriendo en el puerto: ', this.port);
        });
    }

}


module.exports = Server;