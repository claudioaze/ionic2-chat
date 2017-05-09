import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { UsuarioService } from "../../service/usuario.service";
import { ChatService } from './../../service/chat.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})

export class ChatPage {

  nomeUsuario: string;
  mensagemUsuarioConectado: string;

  lista: FirebaseListObservable<any>;
  mensagem: string;

  constructor(public af: AngularFire, private usuarioService: UsuarioService, private chatService: ChatService) {

    this.lista = chatService.getChat();

    this.af.auth.subscribe(auth => {
        if(auth) {
            const usuario = usuarioService.getUserByEmail(auth.auth.email);
            usuario.subscribe(u =>  {
              this.nomeUsuario = u[0].nome;
              this.mensagemUsuarioConectado = this.nomeUsuario+', você está online!'
            });
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
