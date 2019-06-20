import {Component, OnInit} from '@angular/core';
import {Player} from "../../../players/player.model";
import {PlayerService} from "../../../players/player.service";
import { UrlSerializer } from 'ionic-angular';

@Component({
  selector: 'StandingsTable',
  templateUrl: 'standings.html'
})
export class StandingsComponent {

  public players: Player[];

  constructor(private playerService: PlayerService) {
    this.playerService.GetAll().subscribe((players: Player[]) => {
      console.log("getwinpct error")
      console.log(players)
      console.log(typeof players)
      this.players = players.sort((p1, p2) => {

        let player1 = Object.assign(new Player(), p1);        
        let player2 = Object.assign(new Player(), p2);
        p1.winPct = parseFloat((player1.getWinPct()*100).toFixed(2))
        p2.winPct = parseFloat((player2.getWinPct()*100).toFixed(2))

        console.log("list players")
        console.log(p1.Name + " " + p1.Wins + " " + p1.Losses)
        console.log(p2.Name + " " + p2.Wins + " " + p2.Losses)
        return player2.getWinPct() - player1.getWinPct()        
      });
    });
  }

}
