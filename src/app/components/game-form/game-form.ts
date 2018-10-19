import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Player} from "../../../players/player.model";
import {PlayerService} from "../../../players/player.service";
import {GameEntity} from "../../../games/game.entity";
import {TeamEntity} from "../../../teams/team.entity";
import {Geolocation} from "@ionic-native/geolocation";
import moment from "moment";
import {Location} from "../../../games/location.model";

@Component({
  selector: 'GameForm',
  templateUrl: 'game-form.html'
})
export class GameForm {
  public errorMessage: string = "";
  public showAdditionalErrors: boolean = false;
  public submitted: boolean = false;

  public gameForm: FormGroup;

  public players: Player[];

  constructor(private playerService: PlayerService, public viewController: ViewController, private formBuilder: FormBuilder, private geolocation: Geolocation) {
    this.playerService.GetAll().subscribe((players) => {
      this.players = players;
    });

    this.gameForm = this.formBuilder.group({
      "winningPlayer1": ['', Validators.required],
      "winningPlayer2": ['', Validators.required],
      "losingPlayer1": ['', Validators.required],
      "losingPlayer2": ['', Validators.required],
      "winningScore": [null, Validators.compose([Validators.min(0), Validators.required])],
      "losingScore": [null, Validators.compose([Validators.min(0), Validators.required])],
      "notes": ['', Validators.maxLength(100)],
      "locationDescription": ['', Validators.maxLength(100)]
    });
  }

  public reset() {
    this.submitted = false;
    this.gameForm.reset();
  }

  private winnerIsValid(): boolean {
    if (parseInt(this.gameForm.controls['winningScore'].value) < parseInt(this.gameForm.controls['losingScore'].value)) {
      this.errorMessage = "Winning score must be higher than losing score.";
      this.showAdditionalErrors = true;
      return false;
    }

    if (parseInt(this.gameForm.controls['winningScore'].value) < 10) {
      this.errorMessage = "Winning score must be higher than 10.";
      this.showAdditionalErrors = true;
      return false;
    }

    this.showAdditionalErrors = false;
    return true;
  }

  public dismiss() {
    this.viewController.dismiss();
  }

  public saveGame() {
    this.submitted = true;

    if (this.gameForm.valid && this.winnerIsValid()) {

      let winningTeam = new TeamEntity();
      winningTeam.Players = [this.players.find((player) => player.$key == this.gameForm.controls["winningPlayer1"].value),
      this.players.find((player) => player.$key == this.gameForm.controls["winningPlayer2"].value)];
      winningTeam.Score = this.gameForm.controls["winningScore"].value;

      let losingTeam = new TeamEntity();
      losingTeam.Players = [this.players.find((player) => player.$key == this.gameForm.controls["losingPlayer1"].value),
        this.players.find((player) => player.$key == this.gameForm.controls["losingPlayer2"].value)];
      losingTeam.Score = this.gameForm.controls["losingScore"].value;

        this.geolocation.getCurrentPosition().then((geolocation) => {
          let location = new Location();
          location.lat = geolocation.coords.latitude.toString();
          location.lng = geolocation.coords.longitude.toString();
          location.Description = this.gameForm.controls["locationDescription"].value;

          let game = new GameEntity(winningTeam, losingTeam, location, moment().toISOString(), this.gameForm.controls["notes"].value);

          this.viewController.dismiss(game);
        });
    }
  }
}
