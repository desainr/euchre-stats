import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IndividualPage } from '../pages/individual/individual-page.component';
import { Standings } from '../pages/standings/standings';
import { GamePage } from '../pages/game-page/game-page';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../games/game.service';
import { ComponentsModule } from './components/components.module';
import {GameForm} from "./components/game-form/game-form";
import {AngularFireAuth} from "@angular/fire/auth";
import {LoginPage} from "../pages/login/login";
import {AuthService} from "../auth/auth.service";
import {Facebook} from "@ionic-native/facebook";
import {PlayerService} from "../players/player.service";
import {Geolocation} from "@ionic-native/geolocation";
import {TeamService} from "../teams/team.service";

const config = {
  apiKey: "AIzaSyBx5NJAmb6AsrHVHV3OSfjfYOxZUj236As",
  authDomain: "euchreapp-457bb.firebaseapp.com",
  databaseURL: "https://euchreapp-457bb.firebaseio.com",
  projectId: "euchreapp-457bb",
  storageBucket: "euchreapp-457bb.appspot.com",
  messagingSenderId: "336069824641"
};

@NgModule({
  declarations: [
    MyApp,
    IndividualPage,
    Standings,
    GamePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    IndividualPage,
    Standings,
    GamePage,
    TabsPage,
    GameForm
  ],

  // TODO: remove mocks
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    Facebook,
    Geolocation,
    TeamService,
    GameService,
    PlayerService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
