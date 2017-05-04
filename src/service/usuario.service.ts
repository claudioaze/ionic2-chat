import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import firebase from 'firebase';

import { Usuario } from './../model/usuario.model';

@Injectable()
export class UsuarioService {

    private usuarioRef: any;

    constructor(private http: Http) {
        this.usuarioRef = firebase.database().ref('usuario');
    }

    postUsuario(usuario: Usuario) {
        this.usuarioRef.push(usuario);
    }

    getUserByEmail(email: string): Usuario {
        return this.usuarioRef.orderByChild("email").equalTo(email).on('child_added', (response) => response.val());        
    }
}
