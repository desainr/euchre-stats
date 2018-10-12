import {Team} from "../teams/team.model";
import {Location} from "./location.model";

export class Game {
  GameId: string;
  WinningTeam: Team;
  LosingTeam: Team;
  Location: Location;
  Datetime: string;

  constructor(winningTeam: Team = null, losingTeam: Team = null, location: Location = null, gameTime: string = null) {
    this.WinningTeam = winningTeam;
    this.LosingTeam = losingTeam;
    this.Location = location;
    this.Datetime = gameTime;
  }
}
