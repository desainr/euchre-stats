import {NgModule} from '@angular/core';
import {GameForm} from './game-form/game-form';
import {IonicModule} from 'ionic-angular';
import {PlayerService} from "../../players/player.service";
import {GameService} from "../../games/game.service";
import {GameLog} from "./game-log/game-log";
import {Geolocation} from "@ionic-native/geolocation";
import {StandingsComponent} from "./standings/standings";

@NgModule({
  declarations: [GameForm, GameLog, StandingsComponent],
  imports: [
    IonicModule
  ],
  providers: [
    PlayerService,
    GameService,
    Geolocation
  ],
  exports: [GameForm, GameLog, StandingsComponent]
})
export class ComponentsModule {
}
