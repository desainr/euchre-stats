import {Injectable} from "@angular/core";
import {Player} from "./player.model";

@Injectable()
export class MockPlayerService {

  public GetPlayers(): Player[] {
    return [new Player("Nick"), new Player("JT"), new Player("Maria"), new Player("Casey"), new Player("Paul"), new Player("Wildcard")]
  }
}
