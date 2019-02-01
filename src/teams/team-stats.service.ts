import {Injectable} from "@angular/core";
import {IFirebaseReadUpdate} from "../interfaces/firebase-read-update.interface";
import {TeamStats} from "./team-stats.model";
import {Observable, forkJoin} from "rxjs";
import {flatMap, map, switchMap} from "rxjs/operators";
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "@angular/fire/database";
import CONSTANTS from "../static/constants";
import {PlayerService} from "../players/player.service";

@Injectable()
export class TeamStatsService implements IFirebaseReadUpdate<TeamStats>{

  private readonly dbString = "/Teams";

  constructor(private db: AngularFireDatabase, private playerService: PlayerService) {}

  // see comment in GameService about this process of mapping players being bad. Eventually can refactor
  Get(id: string): Observable<TeamStats> {
    return this.db.object<TeamStats>(this.dbString).valueChanges().pipe(flatMap((team: TeamStats) => {
      return this.mapPlayersToTeam(team)
    }))
  }

  private mapPlayersToTeam(team): Observable<TeamStats> {
    const playerObs = [];
    Object.keys(team.Players).forEach(p => playerObs.push(this.playerService.Get(p)));

    return forkJoin(playerObs).pipe(map(players => {
      team.Players = players;
      return team;
    }))
  }

  GetAll(): Observable<TeamStats[]> {
    return this.db.list<TeamStats>(this.dbString).valueChanges().pipe(switchMap((teams: TeamStats[]) => {
      return forkJoin(...teams.map(team => this.mapPlayersToTeam(team)))
    }))
  }

  Update(entity: TeamStats): Observable<void> {
    return undefined;
  }

  GetAllByPlayer(playerId: string): Observable<TeamStats[]> {
    return this.GetAll().pipe(map(teams => {
      return teams.filter(t => t.Players.some(p => p.UID === playerId));
    }))
  }

  AddWins(playerId, playerId2): Observable<void> {
    return this.db.list(this.dbString).snapshotChanges().pipe(map((teamsSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      teamsSnapshot
        .filter(teamData => teamData.payload.child(CONSTANTS.DB.PLAYERS).hasChild(playerId) && teamData.payload.child(CONSTANTS.DB.PLAYERS).hasChild(playerId2))
        .forEach((team) => {
          this.db.list(this.dbString).update(team.key, {Wins: team[CONSTANTS.DB.WINS] + 1});
      })
    }));
  }

  AddLosses(playerId, playerId2): Observable<void> {
    return this.db.list(this.dbString).snapshotChanges().pipe(map((teamsSnapshot: AngularFireAction<DatabaseSnapshot<{}>>[]) => {
      teamsSnapshot
        .filter(teamData => teamData.payload.child(CONSTANTS.DB.PLAYERS).hasChild(playerId) && teamData.payload.child(CONSTANTS.DB.PLAYERS).hasChild(playerId2))
        .forEach((team) => {
          this.db.list(this.dbString).update(team.key, {Wins: team[CONSTANTS.DB.LOSSES] + 1});
        })
    }));
  }

}
