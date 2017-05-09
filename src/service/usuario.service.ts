import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

import { Usuario } from './../model/usuario.model';

@Injectable()
export class UsuarioService {

    private usuarios: FirebaseListObservable<Usuario>;

    constructor(private af: AngularFire) {
        this.usuarios = this.af.database.list('usuario');
    }

    postUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    getUserByEmail(email: string):any {
        return this.af.database.list('usuario', {
            query: {
                orderByChild: 'email',
                equalTo: email
            }
        });
    }

}
