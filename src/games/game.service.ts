import {Injectable} from "@angular/core";
import {Game} from "./game.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Player} from "../players/player.model";
import {Team} from "../teams/team.model";
import {IFirebaseService} from "../interfaces/base-service.interface";

@Injectable()
export class GameService implements IFirebaseService<Game> {

  private games: AngularFireList<Game> = null;

  constructor(private db: AngularFireDatabase) {
    this.games = this.db.list("/games");
  }

  Delete(entity: Game): Observable<void> {
    return Observable.fromPromise(this.games.remove(entity.Time.toISOString()));
  }

  Get(id: number): Observable<Game> {
    return undefined;
  }

  GetAll(): Observable<Game[]> {
    return undefined;
  }

  Save(entity: Game): Observable<void> {
    return undefined;
  }

  Update(entity: Game): Observable<void> {
    return undefined;
  }

}
