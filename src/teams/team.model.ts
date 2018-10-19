import {Player} from "../players/player.model";

export class Team {
    Players: Player[] | any;
    Score: number;

    constructor(players: Player[] = null, score: number = null) {
      this.Players = players;
      this.Score = score;
    }
}
