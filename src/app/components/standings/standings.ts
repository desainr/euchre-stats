import {Component, OnInit} from '@angular/core';
import {Player} from "../../../players/player.model";
import {PlayerService} from "../../../players/player.service";

@Component({
  selector: 'StandingsTable',
  templateUrl: 'standings.html'
})
export class StandingsComponent {

  public players: Player[];

  constructor(private playerService: PlayerService) {
    this.playerService.GetAll().subscribe((players: Player[]) => {
      console.log("getwinpct error")
      console.log(this.players)
      console.log(typeof this.players)
      this.players = players.sort((p1, p2) => {
        console.log("list players")
        console.log(p1.Name + " " + p1.UID + " " + p1.Wins + " " + p1.Losses)
        console.log(p2.Name + " " + p2.UID + " " + p2.Wins + " " + p2.Losses)
        return p2.getWinPct() - p1.getWinPct()        
        // return (p2.Wins && p2.Losses ? (p2.Wins / (p2.Wins + p2.Losses)) : 0)
        //   - (p1.Wins && p1.Losses ? (p1.Wins / (p1.Wins + p1.Losses)) : 0)
      });
    });
  }

}
