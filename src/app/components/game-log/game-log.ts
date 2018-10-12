import {Component, Input} from '@angular/core';
import moment from "moment";
import {Game} from "../../../games/game.model";
import {} from "../../../games/game.service";

@Component({
  selector: 'GameLog',
  templateUrl: 'game-log.html'
})
export class GameLog {

  @Input() public games: Game[] = [];

  constructor() {

  }

  public getTimeDisplay(game: Game): string {
    return moment(game.Datetime).format("MM/DD/YYYY");
  }
}
