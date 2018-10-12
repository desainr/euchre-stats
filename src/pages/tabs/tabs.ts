import { Component } from '@angular/core';
import { GamePage } from '../game-page/game-page';
import { IndividualPage } from '../individual/individual-page.component';
import { Standings } from '../standings/standings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = GamePage;
  tab2Root = IndividualPage;
  tab3Root = Standings;

  constructor() {

  }
}
