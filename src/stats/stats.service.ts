import {Injectable} from "@angular/core";
import {GameService} from "../games/game.service";
import {Game} from "../games/game.model";

@Injectable()
export class StatsService {
  private games: Game[];

  constructor(private gameService: GameService) {}

}
