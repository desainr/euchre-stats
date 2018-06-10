import {Team} from "../teams/team.model";
import {Moment} from "moment";
import {Player} from "../players/player.model";
import moment from "moment";

export class Game {
  Team1: Team = new Team();
  Team2: Team = new Team();
  Time: Moment;
  Location: string;

  constructor(game: object = null, location: string = null) {
    if (game != null && location != null) {
      this.Team1 = new Team(new Player(game["t1p1Name"]), new Player(game["t1p2Name"]));
      this.Team2 = new Team(new Player(game["t2p1Name"]), new Player(game["t2p2Name"]));
      this.Time = moment();
      this.Location = location
    }
  }

  winner(): Team {
    return this.Team1.Score > this.Team2.Score ? this.Team1 : this.Team2;
  }

  loser(): Team {
    return this.Team1.Score < this.Team2.Score ? this.Team1 : this.Team2;
  }

}
