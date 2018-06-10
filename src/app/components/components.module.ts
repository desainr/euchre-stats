import { NgModule } from '@angular/core';
import { GameFormComponent } from './game-form/game-form';
import { IonicModule } from 'ionic-angular';
import {PlayerService} from "../../players/player.service";
import {GameService} from "../../games/game.service";
@NgModule({
	declarations: [GameFormComponent],
	imports: [
		IonicModule
	],
  providers: [
    PlayerService,
    GameService
  ],
	exports: [GameFormComponent]
})
export class ComponentsModule {}
