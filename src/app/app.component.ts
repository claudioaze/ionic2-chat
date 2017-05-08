import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { RegistroPage } from './../pages/registro/registro';
import { ChatPage } from './../pages/chat/chat';
import { RelatorioDiarioPage } from './../pages/relatorio-diario/relatorio-diario';

import { AutenticacaoService } from './../service/autenticacao.service';

import { FirebaseApp } from "angularfire2";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ChatPage;
  isAuthenticated: boolean;
  loginPage = LoginPage;
  registroPage = RegistroPage;
  relatorioPage = RelatorioDiarioPage;
  @ViewChild('nav') nav: NavController;

  constructor(@Inject(FirebaseApp) firebaseApp: any,
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private menuCtrl: MenuController,
      private autenticacaoService: AutenticacaoService) {

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated=true;
        this.rootPage = ChatPage;
      } else {
        this.isAuthenticated=false;
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.isAuthenticated = false;
  }

  carrega(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout() {
    this.autenticacaoService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}

