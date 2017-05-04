import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  usuario: string;

  lista: FirebaseListObservable<any>;
  mensagem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    this.lista = af.database.list("https://chat-494db.firebaseio.com/chat")
    
    console.log('xxxxx', this.lista);
    this.usuario = this.navParams.get('usuario');
  }

  enviarMsg() {
    let msg = {
      usuario: this.usuario,
      texto: this.mensagem,
      data: new Date().toString()
    };

    this.lista.push(msg).then(()=> {
      this.mensagem = "";
      }
    )
  }

}



