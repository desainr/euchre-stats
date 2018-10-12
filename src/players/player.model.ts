export class Player {
  $key: string;
  Name: string;
  Wins: number;
  Losses: number;

  constructor(name: string = "") {
    this.Name = name;
  }
}
