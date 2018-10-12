import {Injectable} from "@angular/core";
import {Game} from "./game.model";
import {Observable} from "rxjs/observable";
import 'rxjs/add/operator/map';
import {from} from 'rxjs';
import {AngularFireDatabase} from "@angular/fire/database";
import {PlayerService} from "../players/player.service";
import {GameEntity} from "./game.entity";

@Injectable()
export class GameService {

  constructor(private db: AngularFireDatabase, private playerService: PlayerService) {

  }

  Delete(entity: Game): Observable<void> {
    return from(this.db.list("/Games/").remove(entity.GameId));
  }

  Get(id: string): Observable<Game> {
    return this.db.object<Game>("/Games/" + id).valueChanges();
  }

  GetAllPaginated(amountToLoad: number, lastDateValue: string = null): Observable<Game[]> {
    let query = this.db.list<Game>("/Games", ref => ref.orderByChild("Datetime").limitToLast(amountToLoad));

    if(lastDateValue) {
      query = this.db.list<Game>("/Games", ref => ref.orderByChild("Datetime").endAt(lastDateValue).limitToLast(amountToLoad));
    }
    return query.valueChanges().map((games: Game[]) => {
      games.map((game: Game) => {
        let losingIds = game.LosingTeam.Players;
        let winningIds = game.WinningTeam.Players;

        game.LosingTeam.Players = [];
        game.WinningTeam.Players = [];

        for (let playerId in losingIds) {
          this.playerService.Get(playerId).subscribe(player => {
            game.WinningTeam.Players.push(player);
          });
        }

        for (let playerId in winningIds) {
          this.playerService.Get(playerId).subscribe(player => {
            game.LosingTeam.Players.push(player);
          });
        }
      });
      return games;
    });

  }

  Save(entity: GameEntity): Observable<void> {
    return from(this.db.list("/Games").push({
        WinningTeam: entity.WinningTeam,
        LosingTeam: entity.LosingTeam,
        Location: entity.Location,
        Datetime: entity.GameTime
      }));
  }

  Update(entity: Game): Observable<void> {
    return undefined;
  }
}
