import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Player } from '../../players/player.model';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'individual',
  templateUrl: 'individual-page.component.html'
})
export class IndividualPage {

  public player: Player;
  public user = {};

  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.user = this.authService.getUser();
  }

}
