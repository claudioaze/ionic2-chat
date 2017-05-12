import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ChatService {

    constructor(private af: AngularFire, private datePipe: DatePipe) {        
    }

    getChat(): FirebaseListObservable<any> {
        return this.af.database.list('batepapo');
    }

    getChatByDate(data: string): any {
        return this.af.database.list('batepapo', {
            query: {
                orderByChild: 'data',
                equalTo: data
            }
        });

    }

    novoChat(chat: any) {
        let lista = this.getChat();        
        lista.push(chat);
    }

    updateChat(chat: any) {
        let lista = this.getChat();
        lista.update(chat.$key, chat);

    }

    addMensagem(mensagem: any) {
        const hoje = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

        const chatHoje = this.getChatByDate(hoje);
        
        chatHoje.subscribe(chat =>  {
            
            if(mensagem && mensagem != null) {
            
                if(chat.length > 0) {
                    chat[0].mensagens.push(mensagem);
                    this.updateChat(chat[0]);
                } else {
                    const chat = {data: hoje.toString(), mensagens: [mensagem]}
                    this.novoChat(chat);
                }
                mensagem = null;
            }
            
        });
    }
}