import {Injectable} from "@angular/core";
import {Game} from "./game.model";
import {Observable} from "rxjs";
import {from, concat, forkJoin} from "rxjs"
import {map, switchMap, take} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {PlayerService} from "../players/player.service";
import {GameEntity} from "./game.entity";
import {IFirebaseReadUpdate} from "../interfaces/firebase-read-update.interface";
import {TeamStatsService} from "../teams/team-stats.service";
import {Player} from "../players/player.model";
import moment from "moment";
import CONSTANTS from "../static/constants";
import IFirebaseSave from "../interfaces/firebase-save.interface";

@Injectable()
export class GameService implements IFirebaseReadUpdate<Game>, IFirebaseSave<GameEntity> {

  private readonly dbPath = "/Games";

  constructor(private db: AngularFireDatabase, private playerService: PlayerService, private teamStatsService: TeamStatsService) {

  }

  // TODO: Need to decide if delete game should exist, if it should be an admin functionality, etc.
  Delete(gameId: string): Observable<void> {
    return from(this.db.list(this.dbPath).remove(gameId));
  }

  Get(id: string): Observable<Game> {
    return this.db.object<Game>(this.dbPath + "/" + id).valueChanges();
  }

  GetAll(): Observable<Game[]> {
    let query = this.db.list<Game>(this.dbPath, ref => ref.orderByChild(CONSTANTS.DB.DATETIME));

    // this is kind of hacky...mapping to Game saves me from having to map all of the properties individually, but
    // also looks like we're getting Player objects back, when we're really just getting the ids. So need to map those
    // to objects. Would be ideal to create new object for "incoming" game and map to outgoing....maybe later.
    return query.valueChanges().pipe(switchMap((games: Game[]) => {
      let gamesComplete = [];
      return forkJoin(...games.map((game: Game) => {
        return this.GetPlayers(game).pipe(map((players: Player[]) => {
          game.WinningTeam.Players = [players[2], players[3]];
          game.LosingTeam.Players = [players[0], players[1]];
          gamesComplete.push(game);
        }))
      })).pipe(map(() => {
        return gamesComplete.sort((game1: Game, game2: Game) => {
          return moment(game1.Datetime).diff(moment(game2.Datetime));
        });
      }))
    }));
  }

  GetAllPaginated(amountToLoad: number, lastDateValue: string = null): Observable<Game[]> {
    let query = this.db.list<Game>(this.dbPath, ref => ref.orderByChild(CONSTANTS.DB.DATETIME).limitToLast(amountToLoad));

    if (lastDateValue) {
      query = this.db.list<Game>(this.dbPath, ref => ref.orderByChild(CONSTANTS.DB.DATETIME).endAt(lastDateValue).limitToLast(amountToLoad));
    }

    return query.valueChanges().pipe(switchMap((games: Game[]) => {
      let gamesComplete = [];
      return forkJoin(...games.map((game: Game) => {
        return this.GetPlayers(game).pipe(map((players: Player[]) => {
          game.WinningTeam.Players = [players[2], players[3]];
          game.LosingTeam.Players = [players[0], players[1]];
          gamesComplete.push(game);
        }))
      })).pipe(map(() => {
        return gamesComplete.sort((game1: Game, game2: Game) => {
          return moment(game1.Datetime).diff(moment(game2.Datetime));
        });
      }))
    }));

  }

  Save(entity: GameEntity): Observable<void> {
    return concat(
      this.playerService.AddWin(entity.WinningTeam.Players[0]),
      this.playerService.AddWin(entity.WinningTeam.Players[1]),
      this.playerService.AddLoss(entity.LosingTeam.Players[0]),
      this.playerService.AddLoss(entity.LosingTeam.Players[1]),
      from(this.db.list(this.dbPath).push({
          WinningTeam: {
            Players: {
              [entity.WinningTeam.Players[0].UID]: true,
              [entity.WinningTeam.Players[1].UID]: true,
            },
            Score: entity.WinningTeam.Score
          },
          LosingTeam: {
            Players: {
              [entity.LosingTeam.Players[0].UID]: true,
              [entity.LosingTeam.Players[1].UID]: true,
            },
            Score: entity.LosingTeam.Score
          },
          Location: entity.Location,
          Datetime: entity.GameTime
        })
      )).pipe(take(1));
  }

  Update(game: Game): Observable<void> {
    return undefined;
  }

  GetLast10ByPlayer(uid: string): Observable<Game[]> {
    return this.GetAll().pipe(map((games: Game[]) => {
      return games.filter(g => {
        return g.WinningTeam.Players[uid] || g.LosingTeam.Players[uid];
      });
    }))
  }

  private GetPlayers(game: Game): Observable<Player[]> {
    let losingIds = Object.keys(game.LosingTeam.Players);
    let winningIds = Object.keys(game.WinningTeam.Players);

    let player1 = this.playerService.Get(losingIds[0]);
    let player2 = this.playerService.Get(losingIds[1]);
    let player3 = this.playerService.Get(winningIds[0]);
    let player4 = this.playerService.Get(winningIds[1]);

    return forkJoin(player1, player2, player3, player4);
  }
}
