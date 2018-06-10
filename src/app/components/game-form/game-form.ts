import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Game} from '../../../games/game.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Team} from "../../../teams/team.model";
import {Player} from "../../../players/player.model";
import moment from "moment";
import {PlayerService} from "../../../players/player.service";
import {MockPlayerService} from "../../../players/mock-player.service";

@Component({
  selector: 'game-form',
  templateUrl: 'game-form.html'
})
export class GameFormComponent {
  public errorMessage: string = "";
  public showAdditionalErrors: boolean = false;
  public submitted: boolean = false;

  public gameForm: FormGroup;

  public players: Player[];

  constructor(public viewController: ViewController, private formBuilder: FormBuilder, private playerService: MockPlayerService) {
    this.players = playerService.GetPlayers();

    this.gameForm = this.formBuilder.group({
      "t1p1Name": ['', Validators.required],
      "t1p2Name": ['', Validators.required],
      "t2p1Name": ['', Validators.required],
      "t2p2Name": ['', Validators.required],
      "t1Score": [null, Validators.compose([Validators.min(0), Validators.required])],
      "t2Score": [null, Validators.compose([Validators.min(0), Validators.required])]
    });

  }

  public reset()
  {
    this.submitted = false;
    this.gameForm.reset();
  }

  private winnerIsValid(): boolean
  {
    if(parseInt(this.gameForm.controls['t1Score'].value) < parseInt(this.gameForm.controls['t2Score'].value))
    {
      this.errorMessage = "Winning score must be higher than losing score.";
      this.showAdditionalErrors = true;
      return false;
    }

    if(parseInt(this.gameForm.controls['t1Score'].value) < 10) {
      this.errorMessage = "Winning score must be higher than 10.";
      this.showAdditionalErrors = true;
      return false;
    }
    this.showAdditionalErrors = false;
    return true;
  }

  public dismiss()
  {
    this.viewController.dismiss();
  }

  public saveGame() {
    this.submitted = true;
    if(this.gameForm.valid && this.winnerIsValid()) {
      this.viewController.dismiss();
    }
  }
}
