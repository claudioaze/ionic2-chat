import { Chat } from './../../model/chat.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chat-diario',
  templateUrl: 'chat-diario.html',
})
export class ChatDiarioPage {

  private lista: Array<Chat>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.lista = this.navParams.get('chatDiario');
  }

}
