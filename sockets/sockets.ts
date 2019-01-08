import {Socket} from "socket.io";
import socketIO from 'socket.io';
import {UserList} from "../classes/user-list";
import {User} from "../classes/user";

export const usersConnect = new UserList();


export const connectClient = ( client: Socket, io: socketIO.Server ) => {
    const user = new User( client.id );
    usersConnect.add( user );

};

export const disconnect = ( client: Socket, io: socketIO.Server ) => {
    client.on('disconnect', () => {
        usersConnect.deleteUser(client.id);
        console.log('Client disconnect!');
        io.emit('active-users', usersConnect.getUserList() );
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
        io.emit('active-users', usersConnect.getUserList() );
        callback( {
            ok: true,
            message: `${payload.name} configured successful`
        } )
    });
};

export const getUsers = ( client: Socket, io: socketIO.Server ) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', usersConnect.getUserList() );
    });
};