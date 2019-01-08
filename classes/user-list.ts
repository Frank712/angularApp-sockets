import {User} from "./user";

export class UserList {
    private  list: User[] = [];

    constructor(){

    }

    // Add a user
    public add( user: User){
        this.list.push( user );
        console.log( user );
        return user;
    }

    public updateName(id: string, name: string){
        for ( let user of this.list ){
            if( user.id === id ){
                user.name = name;
                break;
            }
        }

        console.log('Updating user...');
        console.log( this.list );
    }

    public getUserList(){
        return this.list.filter( user => user.name !== 'without-name' );
    }

    public getUser( id: string ){
        return this.list.find( user => user.id === id );
    }

    public getUsersInChatRoom( chat_room: string ) {
        return this.list.filter( user => user.chat_room === chat_room );
    }

    public deleteUser( id: string ) {
        const userTemp = this.getUser( id );
        if( userTemp ){
            this.list = this.list.filter( user => user.id != id );
            console.log(`User ${userTemp.name} with id: ${userTemp.id} deleted!`);
            return userTemp;
        }
        else{
            console.log('User ${user.id} not found!');
            return;
        }

    }

}