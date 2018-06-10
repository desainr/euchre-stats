import {Injectable} from "@angular/core";
import {Team} from "../teams/team.model";
import {Player} from "../players/player.model";
import {Game} from "./game.model";
import {Observable} from "rxjs/Observable";
import * as moment from "moment";

@Injectable()
export class MockGameService {

  private BuildTeam(name1: string, name2: string): Team {
    let team = new Team();
    team.Player1 = new Player(name1);
    team.Player2 = new Player(name2);

    return team;
  }

  public SaveGame(game: Game) {

  }

  public GetGames(): Observable<Game[]> {
    let game1 = new Game();
    game1.Team1 = this.BuildTeam("Robbie", "Maria");
    game1.Team2 = this.BuildTeam("JT", "Nick");
    game1.Team1.Score = 6;
    game1.Team2.Score = 10;
    game1.Location = "Nick's Apt";
    game1.Time = moment();

    let game2 = new Game();
    game2.Team1 = this.BuildTeam("JT", "Robbie");
    game2.Team2 = this.BuildTeam("Maria", "Nick");

    game2.Team1.Score = 5;
    game2.Team2.Score = 10;
    game2.Location = "Robbie's";
    game2.Time = moment();

    return Observable.of([game1, game2]);
  }
}
