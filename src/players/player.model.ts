export class Player {
  Name: string;
  Wins: number;
  Losses: number;
  UID: string;

  constructor(name: string = "") {
    this.Name = name;
  }

  getWinPct() {
    console.log("it is" + typeof (this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0))
    console.log("result is" + (this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0))
    return this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0;
  }
}
