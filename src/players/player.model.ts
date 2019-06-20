export class Player {
  Name: string;
  Wins: number;
  Losses: number;
  UID: string;
  winPct: number;

  constructor(name: string = "") {
    this.Name = name;
  }

  getWinPct() {    
    console.log(this.Name + " win % is" + (this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0))
    return this.Wins && this.Losses ? (this.Wins / (this.Wins + this.Losses)) : 0;
  }
}
