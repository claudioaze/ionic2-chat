import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Validacao } from './../../validacao/validacao';
import { AutenticacaoService } from './../../service/autenticacao.service';
import { UsuarioService } from './../../service/usuario.service';

import { Usuario } from './../../model/usuario.model';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService) {
      this.criarForm();
  }

  public criarForm() {

    const formControlSenha: FormControl = new FormControl('', Validators.required);

    const formControlConfirmaSenha: FormControl = new FormControl(
      '', Validators.compose([Validators.required, Validacao.mesmoValor(formControlSenha)]));
      
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validacao.email()])],
      senha: formControlSenha,
      confirmaSenha: formControlConfirmaSenha
    });
    
  }

  cadastrar() {
    const loading = this.loadingCtrl.create({
      content: 'Efetuando cadastro no chat'
    });
    loading.present();
    this.autenticacaoService.registra(this.form.value.email, this.form.value.senha)
      .then(data => {
        
        const usuario: Usuario = {email: this.form.value.email, nome: this.form.value.usuario};
        
        this.usuarioService.postUsuario(usuario);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no registro',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
