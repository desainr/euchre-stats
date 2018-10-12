import {Injectable} from "@angular/core";
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "@angular/fire/database";
import {Observable} from 'rxjs';
import {Player} from "./player.model";

@Injectable()
export class PlayerService {
  constructor(private db: AngularFireDatabase) {
  }

  Delete(entity: Player): Observable<void> {
    return undefined;
  }

  Get(guid: string): Observable<Player> {
    return this.db.object("/Players/" + guid).snapshotChanges().map((playerSnapshot: AngularFireAction<DatabaseSnapshot<{}>>) => {
      return this.toPlayer(playerSnapshot);
    });
  }

  GetAll(): Observable<Player[]> {
    // using snapshotChanges() to get player ID. Need to save Game object.
    return this.db.list("/Players").snapshotChanges().map((playersSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      let players: Player[] = [];
      playersSnapshot.forEach((playerData: AngularFireAction<DatabaseSnapshot<{}>>) => {
        players.push(this.toPlayer(playerData));
      });

      return players;
    });
  }

  Save(entity: Player): Observable<void> {
    return undefined;
  }

  Update(entity: Player): Observable<void> {
    return undefined;
  }

  private toPlayer(playerObj: AngularFireAction<DatabaseSnapshot<{}>>) : Player {
    let player = new Player();
    player.$key = playerObj.key;
    player.Losses = playerObj.payload.child("Losses").val();
    player.Wins = playerObj.payload.child("Wins").val();
    player.Name = playerObj.payload.child("Name").val();

    return player;
  }

}
