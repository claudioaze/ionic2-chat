import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFire } from 'angularfire2';

import { Chat } from './../model/chat.model';
import { RelatorioDiario } from './../model/relatorio-diario.model';

@Injectable()
export class RelatorioDiarioService {

    private listaRelatorioDiario: Array<RelatorioDiario> = new Array<RelatorioDiario>();

    constructor(private af: AngularFire, private datePipe: DatePipe) {
        this.getDatasChat();
    }

    public getLista(): Array<RelatorioDiario> {
        return this.listaRelatorioDiario;
    }

    getDatasChat() {

        this.af.database.list('/chat').subscribe((res) => {
        
            res.forEach(item => {

                const data = this.datePipe.transform(new Date(item.data), 'dd/MM/yyyy');
                
                let element = this.listaRelatorioDiario.find(e => e.data == data);
                
                if(element) {
                    element.chatDiario.push(item);
                } else {
                    let chatDiario: Array<Chat> = new Array<string>();
                    chatDiario.push(item);

                    let rd: RelatorioDiario = new RelatorioDiario(data, chatDiario);
                    this.listaRelatorioDiario.push(rd);
                }

            });

        });

    }
}