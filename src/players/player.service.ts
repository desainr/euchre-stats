import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Player} from "./player.model";
import {IFirebaseService} from "../interfaces/base-service.interface";

@Injectable()
export class PlayerService implements IFirebaseService<Player> {
  constructor(private db: AngularFireDatabase) {}

  Delete(entity: Player): Observable<void> {
    return undefined;
  }

  Get(id: number): Observable<Player> {
    return undefined;
  }

  GetAll(): Observable<Player[]> {
    return undefined;
  }

  Save(entity: Player): Observable<void> {
    return undefined;
  }

  Update(entity: Player): Observable<void> {
    return undefined;
  }


}
