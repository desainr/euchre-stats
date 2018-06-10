import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Player } from '../../players/player.model';

@Component({
  selector: 'individual',
  templateUrl: 'individual.html'
})
export class Individual {

  public player: Player;

  constructor(public navCtrl: NavController) {

  }

}
