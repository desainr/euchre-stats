import {Injectable} from "@angular/core";
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "@angular/fire/database";
import {Observable, from} from 'rxjs';
import {map, take} from "rxjs/operators";
import {Player} from "./player.model";
import {IFirebaseReadUpdate} from "../interfaces/firebase-read-update.interface";

@Injectable()
export class PlayerService implements IFirebaseReadUpdate<Player> {

  private readonly dbString = '/Players';

  constructor(private db: AngularFireDatabase) {
  }

  Delete(uid: string): Observable<void> {
    return from(this.db.list(this.dbString).remove(uid));
  }

  // I HAVE NO IDEA WHY THIS HAS TO BE THIS HARD WTF. USING THE AUTO BINDINGS BREAKS ALL OF THE MAPPINGS
  Get(guid: string): Observable<Player> {
    return this.db.object(this.dbString + "/" + guid).snapshotChanges().pipe(map((playerSnapshot: AngularFireAction<DatabaseSnapshot<{}>>) => {
      return this.mapToPlayerObj(playerSnapshot);
    })).pipe(take(1));
  }

  GetAll(): Observable<Player[]> {
    return this.db.list<Player>(this.dbString).valueChanges()
  }

  Save(entity: Player): Observable<void> {
    return undefined;
  }

  Update(entity: Player): Observable<void> {
    return undefined;
  }

  AddWin(player: Player): Observable<void> {
    return from(this.db.list(this.dbString).update(player.UID, {Wins: player.Wins + 1}));
  }

  AddLoss(player: Player): Observable<void> {
    return from(this.db.list(this.dbString).update(player.UID, {Losses: player.Losses + 1}));
  }

  private mapToPlayerObj(playerObj: AngularFireAction<DatabaseSnapshot<{}>>): Player {
    let player = new Player();
    player.Losses = playerObj.payload.child("Losses").val();
    player.Wins = playerObj.payload.child("Wins").val();
    player.Name = playerObj.payload.child("Name").val();
    player.UID = playerObj.key;

    return player;
  }
 


}
