import {Injectable} from "@angular/core";
import {IFirebaseService} from "../interfaces/base-service.interface";
import {TeamEntity} from "./team.entity";
import {Team} from "./team.model";
import {Observable, from} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "@angular/fire/database";
import {Player} from "../players/player.model";

@Injectable()
export class TeamService implements IFirebaseService<Team, TeamEntity> {

  private readonly dbString = "/Teams";

  constructor(private db: AngularFireDatabase) {}

  Delete(entity: TeamEntity): Observable<void> {
    return from(this.db.list(this.dbString).remove(entity.$key));
  }

  Get(id: string): Observable<Team> {
    return this.db.object<Team>(this.dbString + "/" + id).valueChanges();
  }

  GetAll(): Observable<Team[]> {
    return this.db.list<Team>(this.dbString).valueChanges();
  }

  Save(entity: TeamEntity): Observable<void> {
    return undefined;
  }

  Update(entity: TeamEntity): Observable<void> {
    return undefined;
  }

  AddWins(playerId, playerId2): Observable<void> {
    return this.db.list(this.dbString).snapshotChanges().pipe(map((teamsSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      teamsSnapshot
        .filter(teamData => teamData.payload.child("Players").hasChild(playerId) && teamData.payload.child("Players").hasChild(playerId2))
        .forEach((team) => {
          this.db.list(this.dbString).update(team.key, {Wins: team["Wins"] + 1});
      })
    }));
  }

  AddLosses(playerId, playerId2): Observable<void> {
    return this.db.list(this.dbString).snapshotChanges().pipe(map((teamsSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      teamsSnapshot
        .filter(teamData => teamData.payload.child("Players").hasChild(playerId) && teamData.payload.child("Players").hasChild(playerId2))
        .forEach((team) => {
          this.db.list(this.dbString).update(team.key, {Wins: team["Losses"] + 1});
        })
    }));
  }

}
