import { Component } from '@angular/core';
import { GamePage } from '../game-page/game-page';
import { IndividualPage } from '../individual/individual-page.component';
import { Standings } from '../standings/standings';
import {PlayerService} from "../../players/player.service";
import {Player} from "../../players/player.model";
import {AuthService} from "../../auth/auth.service";
import {flatMap} from "rxjs/operators";
import {User} from "firebase";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = GamePage;
  tab2Root = IndividualPage;
  tab3Root = Standings;

  public player: Player;

  constructor(private playerService: PlayerService, private authService: AuthService) {
    this.authService.getUser().pipe(flatMap((firebaseUser: User) => {
      return this.playerService.Get(firebaseUser.uid)
    })).subscribe((player: Player) => {
      this.player = player;
    })

  }
}
