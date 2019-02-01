class PlayerEntity {
  public $key: string;
  public Name: string;
  public Wins: number;
  public Losses: number;
  public UID: string;

  public constructor(name: string = null, wins: number = null, losses: number = null, UID: string = null) {
    this.Name = name;
    this.Wins = wins;
    this.Losses = losses;
    this.UID = UID;
  }
}
