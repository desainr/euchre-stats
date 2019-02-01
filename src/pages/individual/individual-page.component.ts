import {Component} from '@angular/core';
import { Player } from '../../players/player.model';
import {AuthService} from "../../auth/auth.service";
import {GameService} from "../../games/game.service";
import {Game} from "../../games/game.model";
import {TeamStatsService} from "../../teams/team-stats.service";
import {NavParams} from "ionic-angular";
import {TeamStats} from "../../teams/team-stats.model";
import {forkJoin} from "rxjs";
import {PlayerService} from "../../players/player.service";

@Component({
  selector: 'individual',
  templateUrl: 'individual-page.component.html'
})
export class IndividualPage {
  public player: Player;
  public games: Game[] = [];
  public teams: TeamStats[] = [];

  constructor(private navParams: NavParams, private authService: AuthService, private gameService: GameService, private teamStatsService: TeamStatsService, private playerService: PlayerService) {
      this.player = this.navParams.get("player");
      // const allGames = this.gameService.GetLast10ByPlayer(this.player.UID);
      this.teamStatsService.GetAllByPlayer(this.player.UID).subscribe((teams: TeamStats[]) => {
        this.teams = teams;
      });
  }



}
