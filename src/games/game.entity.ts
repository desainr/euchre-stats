import {Location} from "./location.model";
import {TeamEntity} from "../teams/team.entity";

export class GameEntity {
  $key: string;
  WinningTeam: TeamEntity;
  LosingTeam: TeamEntity;
  Location: Location;
  GameTime: string;
  Notes: string;

  constructor(winningTeam: TeamEntity, losingTeam: TeamEntity, location: Location, gameTime: string, notes: string) {
    this.WinningTeam = winningTeam;
    this.LosingTeam = losingTeam;
    this.Location = location;
    this.GameTime = gameTime;
    this.Notes = notes;
  }
}
