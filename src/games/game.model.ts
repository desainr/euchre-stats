import {Location} from "./location.model";
import {TeamEntity} from "./team.entity";

export class Game {
  GameId: string;
  WinningTeam: TeamEntity;
  LosingTeam: TeamEntity;
  Location: Location;
  Datetime: string;

  constructor(winningTeam: TeamEntity = null, losingTeam: TeamEntity = null, location: Location = null, gameTime: string = null) {
    this.WinningTeam = winningTeam;
    this.LosingTeam = losingTeam;
    this.Location = location;
    this.Datetime = gameTime;
  }
}
