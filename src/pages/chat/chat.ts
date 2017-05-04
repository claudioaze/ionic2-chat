import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UsuarioService } from "../../service/usuario.service";

import { FirebaseApp } from "angularfire2";
import { Usuario } from "../../model/usuario.model";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  usuario: Usuario;

  lista: FirebaseListObservable<any>;
  mensagem: string;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, private usuarioService: UsuarioService) {

    this.lista = af.database.list("https://chat-494db.firebaseio.com/chat")
    
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        const usuario = usuarioService.getUserByEmail(user.email);
        console.log('usu',usuario);        
      }
    });
  }

  enviarMsg() {
    let msg = {
      usuario: this.usuario,
      texto: this.mensagem,
      data: new Date().toString()
    };

    this.lista.push(msg).then(()=> {
      this.mensagem = "";
    });
  }

}



