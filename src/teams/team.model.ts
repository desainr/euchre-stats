import { Player } from "../players/player.model";

export class Team {
    Player1: Player = new Player();
    Player2: Player = new Player();
    Score: Number;

    constructor(player1: Player = null, player2: Player = null, score: number = null) {
      this.Player1 = player1;
      this.Player2 = player2;
      this.Score = score;
    }
}
