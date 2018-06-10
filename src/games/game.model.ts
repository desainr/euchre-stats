import { Team } from "../teams/team.model";
import {Moment} from "moment";

export class Game {
    Team1: Team = new Team();
    Team2: Team = new Team();
    Time: Moment;
    Location: string;

    winner(): Team {
      return this.Team1.Score > this.Team2.Score ? this.Team1 : this.Team2;
    }

    loser(): Team {
      return this.Team1.Score < this.Team2.Score ? this.Team1 : this.Team2;
    }

}
