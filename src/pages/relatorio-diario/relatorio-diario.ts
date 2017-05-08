import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Chat } from './../../model/chat.model';
import { ChatDiarioPage } from './../chat-diario/chat-diario';
import { RelatorioDiarioService } from './../../service/relatorio-diario.service';

@Component({
  selector: 'page-relatorio-diario',
  templateUrl: 'relatorio-diario.html',
})
export class RelatorioDiarioPage {

  lista: any;

  constructor(public navCtrl: NavController, private relatorioDiarioService: RelatorioDiarioService) {
    this.lista = relatorioDiarioService.getLista();
  }

  visualizarChatDiario(chatDiario: Chat) {
    console.log('xx', chatDiario);
    this.navCtrl.push(ChatDiarioPage, {chatDiario: chatDiario});
  }


}
