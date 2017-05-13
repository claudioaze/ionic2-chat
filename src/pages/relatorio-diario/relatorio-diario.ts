import { FirebaseListObservable } from 'angularfire2';
import { DatePipe } from '@angular/common';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Chat } from './../../model/chat.model';
import { ChatDiarioPage } from './../chat-diario/chat-diario';
import { ChatService } from './../../service/chat.service';

@Component({
  selector: 'page-relatorio-diario',
  templateUrl: 'relatorio-diario.html',
})
export class RelatorioDiarioPage {

  private lista: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private chatService: ChatService, private datePipe: DatePipe) {
  }

  ionViewWillEnter() {
    this.lista = this.chatService.getChat();
  }

  visualizarChatDiario(chatDiario: Chat) {
    this.navCtrl.push(ChatDiarioPage, {chatDiario: chatDiario});
  }

}
