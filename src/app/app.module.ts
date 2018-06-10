import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Individual } from '../pages/individual/individual';
import { Standings } from '../pages/standings/standings';
import { GameLog } from '../pages/game-log/game-log';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../games/game.service';
import { ComponentsModule } from './components/components.module';
import {GameFormComponent} from "./components/game-form/game-form";
import {MockGameService} from "../games/mock-game.service";
import {MockPlayerService} from "../players/mock-player.service";

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
    Individual,
    Standings,
    GameLog,
    TabsPage
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
    Individual,
    Standings,
    GameLog,
    TabsPage,
    GameFormComponent
  ],

  // TODO: remove mocks
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    MockPlayerService,
    MockGameService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
