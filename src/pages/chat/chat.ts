import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { Usuario } from "../../model/usuario.model";

import { UsuarioService } from "../../service/usuario.service";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  nomeUsuario: Usuario;

  lista: FirebaseListObservable<any>;
  mensagem: string;

  constructor(public af: AngularFire, private usuarioService: UsuarioService) {

    this.lista = af.database.list("chat")
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const usuario = usuarioService.getUserByEmail(user.email);
        usuario.subscribe(u =>  this.nomeUsuario = u[0].nome);
      }
    });
  }

  enviarMsg() {
    let msg = {
      usuario: this.nomeUsuario,
      texto: this.mensagem,
      data: new Date().toString()
    };

    this.lista.push(msg).then(()=> {
      this.mensagem = "";
    });
  }

}



