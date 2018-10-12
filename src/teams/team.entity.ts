export class TeamEntity {
  $key: string;
  Players: object = {};
  Score: number;

  constructor(players: Array<string>, score: number) {
    players.forEach((player) => {
      this.Players[player] = true;
    });

    this.Score = score;
  }
}
