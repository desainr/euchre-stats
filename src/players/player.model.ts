export class Player {
  $key: string;
  Name: string;
  Wins: number;
  Losses: number;
  WinPct: number;

  constructor(name: string = "") {
    this.Name = name;
  }
}
