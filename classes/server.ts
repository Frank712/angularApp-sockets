import express from 'express';
import {SERVER_PORT} from "../global/enviroment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server{
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.listenSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private listenSockets(){
        console.log('Listen connections - sockets');
        this.io.on('connection', client =>{
            console.log(client.id, " connect");
            // Config user
            socket.configUser( client, this.io );
            // Connect Client
            socket.connectClient( client, this.io );
            //  Listen disconnect event
            socket.disconnect(client, this.io);
            // Listen messages event
            socket.message(client, this.io);
            // Get all users connected
            socket.getUsers(client, this.io);
        });
    }

    start(callback: Function){
        this.httpServer.listen( this.port, callback);
    }
}

