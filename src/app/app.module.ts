import { RegistroPage } from './../pages/registro/registro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";

import { ChatPage } from './../pages/chat/chat';
import { LoginPage } from './../pages/login/login';
import { MyApp } from './app.component';

import { AutenticacaoService } from './../service/autenticacao.service';

export const firebaseConfig = {
  apiKey: "AIzaSyAKZuwZXpLnyFKA9MGTQSX1fjHeKgyPm80",
  authDomain: "chat-494db.firebaseapp.com",
  databaseURL: "https://chat-494db.firebaseio.com",
  projectId: "chat-494db",
  storageBucket: "chat-494db.appspot.com",
  messagingSenderId: "718602212942"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ChatPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChatPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AutenticacaoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}