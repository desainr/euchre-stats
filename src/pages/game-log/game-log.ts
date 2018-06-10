import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Game} from '../../games/game.model';
import {GameFormComponent} from '../../app/components/game-form/game-form';
import {MockGameService} from "../../games/mock-game.service";
import moment from "moment";

@Component({
  selector: 'game-log',
  templateUrl: 'game-log.html'
})
export class GameLog {

  public games: Game[];

  constructor(public navCtrl: NavController, private gameService: MockGameService, private modalController: ModalController) {
    gameService.GetGames().subscribe((data) => {
      this.games = data;
    });
  }

  public addGame() {
    let addGameModal = this.modalController.create(GameFormComponent);

    addGameModal.onDidDismiss((game?: Game) => {
      if (game) {
        // add location
        this.gameService.SaveGame(game);
      }
    });
    addGameModal.present();
  }

  public getTimeDisplay(game: Game): string
  {
    return moment(game.Time).format("MM/DD/YYYY");
  }

}
