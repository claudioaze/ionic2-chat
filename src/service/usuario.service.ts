import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

import { Usuario } from './../model/usuario.model';

@Injectable()
export class UsuarioService {

    private usuarioRef: any;

    constructor(private angularFire: AngularFire) {
        this.usuarioRef = firebase.database().ref('usuario');
    }

    postUsuario(usuario: Usuario) {
        this.usuarioRef.push(usuario);
    }

    getUserByEmail(email: string):any {
        return this.angularFire.database.list('usuario', {
            query: {
                orderByChild: 'email',
                equalTo: email
            }
        });
    }

}
