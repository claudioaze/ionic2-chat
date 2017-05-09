import { DatePipe } from '@angular/common';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { RelatorioDiario } from './../../model/relatorio-diario.model';
import { Chat } from './../../model/chat.model';
import { ChatDiarioPage } from './../chat-diario/chat-diario';
import { ChatService } from './../../service/chat.service';

@Component({
  selector: 'page-relatorio-diario',
  templateUrl: 'relatorio-diario.html',
})
export class RelatorioDiarioPage {

  private lista: Array<RelatorioDiario> = new Array<RelatorioDiario>();

  constructor(public navCtrl: NavController, private chatService: ChatService, private datePipe: DatePipe) {
  }

  ionViewWillEnter() {
    this.chatService.getChat().subscribe((res) => {
        
        res.forEach(item => {
          const data = this.datePipe.transform(new Date(item.data), 'dd/MM/yyyy');
          
          let element = this.lista.find(e => e.data == data);
          
          if(element) {
              element.chatDiario.push(item);
          } else {
              let chatDiario: Array<Chat> = new Array<string>();
              chatDiario.push(item);

              let rd: RelatorioDiario = new RelatorioDiario(data, chatDiario);
              this.lista.push(rd);
          }

      });

    });
  }

  visualizarChatDiario(chatDiario: Chat) {
    this.navCtrl.push(ChatDiarioPage, {chatDiario: chatDiario});
  }

}
