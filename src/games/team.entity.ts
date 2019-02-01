import {Player} from "../players/player.model";

export class TeamEntity {
  $key: string;
  Players: Player[];
  Score: number;
}
