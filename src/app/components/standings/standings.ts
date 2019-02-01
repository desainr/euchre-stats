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
      this.players = players.sort((p1, p2) => {
        return p2.getWinPct() - p1.getWinPct()
      });
    })
  }
}
