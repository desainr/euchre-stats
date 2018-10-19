class PlayerEntity {
  public $key: string;
  public Name: String;
  public Wins: number;
  public Losses: number;

  public constructor(id: string, name: string = null, wins: number = null, losses: number = null) {
    this.$key = id;
    this.Name = name;
    this.Wins = wins;
    this.Losses = losses;
  }
}
