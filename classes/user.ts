 export class User {
    public id: string;
    public name: string;
    public chat_room: string;

    constructor( id: string ){
        this.id = id;
        this.name = 'without name';
        this.chat_room = 'without_chat_room';
    }
 }