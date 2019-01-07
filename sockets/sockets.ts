import {Socket} from "socket.io";
import socketIO from 'socket.io';
import {UserList} from "../classes/user-list";
import {User} from "../classes/user";

export const usersConnect = new UserList();


export const connectClient = ( client: Socket ) => {
    const user = new User( client.id );
    usersConnect.add( user );
};

export const disconnect = ( client: Socket ) => {
    client.on('disconnect', () => {
        usersConnect.deleteUser(client.id);
        console.log('Client disconnect!');
    });
};

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on('message', (payload: {name: string, message: string}) => {
        console.log("Message received: ", payload);
        io.emit('new-message', payload);
    });
};

export const configUser = ( client: Socket, io: socketIO.Server ) => {
    client.on('config-user', (payload: {name: string }, callback: Function) => {
        console.log("Message received: ", payload);
        usersConnect.updateName( client.id, payload.name );
        callback( {
            ok: true,
            message: `${payload.name} configured successful`
        } )
    });
};