import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from "angularfire2";

import { RelatorioDiarioPage } from './../pages/relatorio-diario/relatorio-diario';
import { ChatPage } from './../pages/chat/chat';
import { LoginPage } from './../pages/login/login';
import { RegistroPage } from './../pages/registro/registro';
import { ChatDiarioPage } from './../pages/chat-diario/chat-diario';
import { MyApp } from './app.component';

import { ChatService } from './../service/chat.service';
import { AutenticacaoService } from './../service/autenticacao.service';
import { UsuarioService } from './../service/usuario.service';

export const firebaseConfig = {
  apiKey: "AIzaSyAFDwI3C7AkzFA4KKoIj6kDDqy0yKbxEQw",
  authDomain: "batepapo-b30f6.firebaseapp.com",
  databaseURL: "https://batepapo-b30f6.firebaseio.com",
  projectId: "batepapo-b30f6",
  storageBucket: "batepapo-b30f6.appspot.com",
  messagingSenderId: "303760937343"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ChatPage,
    RegistroPage,
    RelatorioDiarioPage,
    ChatDiarioPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChatPage,
    RegistroPage,
    RelatorioDiarioPage,
    ChatDiarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AutenticacaoService,
    UsuarioService,
    DatePipe,
    ChatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
