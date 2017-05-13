import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Mensagem } from './../model/mensagem.model';
import { Chat } from './../model/chat.model';

@Injectable()
export class ChatService {

    constructor(private af: AngularFire, private datePipe: DatePipe) {        
    }

    getChat(): FirebaseListObservable<any> {
        return this.af.database.list('batepapo');
    }

    getChatByDate(data: string): FirebaseListObservable<any> {
        return this.af.database.list('batepapo', {
            query: {
                orderByChild: 'data',
                equalTo: data
            }
        });

    }

    novoChat(chat: Chat) {
        let lista = this.getChat();        
        lista.push(chat);
    }

    updateChat(key: string, chat: any) {
        let lista = this.getChat();
        lista.update(key, chat);
    }

    addMensagem(mensagem: Mensagem) {
        const hoje = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

        const chatHoje = this.getChatByDate(hoje);
        
        chatHoje.subscribe(chat =>  {
            
            if(mensagem && mensagem != null) {
            
                if(chat.length > 0) {
                    chat[0].mensagens.push(mensagem);
                    this.updateChat(chat[0].$key, chat[0]);
                } else {
                    const chat = {data: hoje.toString(), mensagens: [mensagem]}
                    this.novoChat(chat);
                }
                mensagem = null;
            }
            
        });
    }
}
