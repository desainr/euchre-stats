import { NgModule } from '@angular/core';
import { GameForm } from './game-form/game-form';
import { IonicModule } from 'ionic-angular';
import {PlayerService} from "../../players/player.service";
import {GameService} from "../../games/game.service";
import {GameLog} from "./game-log/game-log";
@NgModule({
	declarations: [GameForm, GameLog],
	imports: [
		IonicModule
	],
  providers: [
    PlayerService,
    GameService
  ],
	exports: [GameForm, GameLog]
})
export class ComponentsModule {}
