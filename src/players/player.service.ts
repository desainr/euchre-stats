import {Injectable} from "@angular/core";
import {AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot} from "@angular/fire/database";
import {Observable, from} from 'rxjs';
import {map, concatMap, take} from "rxjs/operators";
import {Player} from "./player.model";
import {IFirebaseService} from "../interfaces/base-service.interface";

@Injectable()
export class PlayerService implements IFirebaseService<Player, PlayerEntity> {

  private readonly dbString = "/Players";

  constructor(private db: AngularFireDatabase) {
  }

  Delete(entity: PlayerEntity): Observable<void> {
    return from(this.db.list(this.dbString).remove(entity.$key));
  }

  Get(guid: string): Observable<Player> {
    return this.db.object(this.dbString + "/" + guid).snapshotChanges().pipe(map((playerSnapshot: AngularFireAction<DatabaseSnapshot<{}>>) => {
      return this.toPlayer(playerSnapshot);
    })).pipe(take(1));
  }

  GetAll(): Observable<Player[]> {
    // using snapshotChanges() to get player ID. Need to save Game object.
    return this.db.list(this.dbString).snapshotChanges().pipe(map((playersSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      let players: Player[] = [];
      playersSnapshot.forEach((playerData: AngularFireAction<DatabaseSnapshot<{}>>) => {
        players.push(this.toPlayer(playerData));
      });

      return players;
    }));
  }

  Save(entity: PlayerEntity): Observable<void> {
    return undefined;
  }

  Update(entity: PlayerEntity): Observable<void> {
    return undefined;
  }

  AddWin(player: Player): Observable<void> {
    return from(this.db.list(this.dbString).update(player.$key, {Wins: player.Wins + 1}));
  }

  AddLoss(player: Player): Observable<void> {
    return from(this.db.list(this.dbString).update(player.$key, {Losses: player.Losses + 1}));
  }

  private toPlayer(playerObj: AngularFireAction<DatabaseSnapshot<{}>>): Player {
    let player = new Player();
    player.$key = playerObj.key;
    player.Losses = playerObj.payload.child("Losses").val();
    player.Wins = playerObj.payload.child("Wins").val();
    player.Name = playerObj.payload.child("Name").val();
    player.WinPct = parseFloat((player.Wins / (player.Wins + player.Losses)).toFixed(4));

    return player;
  }

}
