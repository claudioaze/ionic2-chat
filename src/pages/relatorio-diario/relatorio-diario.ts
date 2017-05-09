import { RelatorioDiario } from './../../model/relatorio-diario.model';
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

  lista: Array<RelatorioDiario>;

  constructor(public navCtrl: NavController, private relatorioDiarioService: RelatorioDiarioService) {
    this.lista = relatorioDiarioService.getLista();
  }

  visualizarChatDiario(chatDiario: Chat) {
    this.navCtrl.push(ChatDiarioPage, {chatDiario: chatDiario});
  }

}
