import {Component} from '@angular/core';
import {NavController, ModalController, ToastController} from 'ionic-angular';
import {GameForm} from '../../app/components/game-form/game-form';
import {GameService} from "../../games/game.service";
import {map} from "rxjs/operators";
import {Game} from "../../games/game.model";
import {GameEntity} from "../../games/game.entity";

@Component({
  selector: 'game-page',
  templateUrl: 'game-page.html'
})
export class GamePage {

  public games: Game[] = [];
  private gameIndex = 15;
  private readonly numToLoad = 15;

  constructor(public navCtrl: NavController, private gameService: GameService, private modalController: ModalController, private toastController: ToastController) {
    this.gameService.GetAllPaginated(this.numToLoad).subscribe((games) => {
      this.games = games.reverse();
    });
  }

  public scrollInfinite(scroll) {
    let oldestDate = this.games[this.games.length - 1].Datetime;

    setTimeout(() => {
      this.gameService.GetAllPaginated(this.numToLoad, oldestDate).subscribe((games) => {
        // don't know why .concat() won't work properly here
        if(games.length < this.numToLoad) {
          scroll.enable(false);
        }

        games.reverse().forEach((game) => {
          this.games.push(game);
        });

        this.gameIndex = this.games.length;
      });

      scroll.complete();
    }, 1000);
  }

  public presentSaveSuccesful() {
    let toast = this.toastController.create({
      message: "Game saved successfully",
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  public addGame() {
    let addGameModal = this.modalController.create(GameForm);

    addGameModal.onDidDismiss((game?: GameEntity) => {
      if (game) {
        this.gameService.Save(game).subscribe(() => {
          this.presentSaveSuccesful();
        });
      }
    });
    addGameModal.present();
  }
}
