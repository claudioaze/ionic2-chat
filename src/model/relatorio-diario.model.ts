import { Chat } from './chat.model';

export class RelatorioDiario {

    data: string;
    chatDiario: Array<Chat>;

    constructor(data: string, chatDiario: Array<Chat>){
        this.data = data;
        this.chatDiario = chatDiario;
    }
    
}