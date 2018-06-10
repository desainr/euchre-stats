import { Component } from '@angular/core';
import { GameLog } from '../game-log/game-log';
import { Individual } from '../individual/individual';
import { Standings } from '../standings/standings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GameLog;
  tab2Root = Standings;

  constructor() {

  }
}
