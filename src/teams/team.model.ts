import {Player} from "../players/player.model";

export class Team {
    Players: Player[];
    Score: number;

    constructor(players: Player[] = null, score: number = null) {
      this.Players = players;
      this.Score = score;
    }
}
