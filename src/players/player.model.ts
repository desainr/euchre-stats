export class Player {
  Name: string;
  Wins: number;
  Losses: number;
  UID: string;

  constructor(name: string = "") {
    this.Name = name;
  }

  getWinPct() {
    return this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0;
  }
}
