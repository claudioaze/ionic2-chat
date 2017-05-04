import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import firebase from 'firebase';

import { Usuario } from './../model/usuario.model';

@Injectable()
export class UsuarioService {

    private baseUrl = 'https://chat-494db.firebaseio.com';
    private usuarioRef: any;

    constructor(private http: Http) {
        this.usuarioRef = firebase.database().ref('usuario');
        console.log('xx', this.usuarioRef);
    }

    postUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post(`${this.baseUrl}/usuario.json`, usuario)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUserByEmail(email: string): Observable<Usuario>{
        return this.usuarioRef.list('usuario',{
            query: {
            orderByChild: 'email',
            equalTo: email
        }
        }).first();

    }
}
