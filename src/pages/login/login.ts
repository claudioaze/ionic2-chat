import { Validacao } from './../../validacao/validacao';
import { AutenticacaoService } from './../../service/autenticacao.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService) {
      this.iniciarForm();
  }

  private iniciarForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validacao.email()])],
      senha: ['', Validators.required]
    });
  }

  login() {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o login'
    });
    loading.present();

    this.autenticacaoService.login(this.form.value.email, this.form.value.senha)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no login',
          message: 'Usuário e/ou Senha incorretos',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
