import {Injectable} from "@angular/core";
import {Game} from "./game.model";
import {Observable} from "rxjs";
import {from, concat, forkJoin} from "rxjs"
import {map, switchMap, take} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {PlayerService} from "../players/player.service";
import {GameEntity} from "./game.entity";
import {IFirebaseService} from "../interfaces/base-service.interface";
import {TeamService} from "../teams/team.service";
import {Player} from "../players/player.model";
import moment from "moment";

@Injectable()
export class GameService implements IFirebaseService<Game, GameEntity> {

  constructor(private db: AngularFireDatabase, private playerService: PlayerService, private teamService: TeamService) {

  }

  Delete(entity: GameEntity): Observable<void> {
    return from(this.db.list("/Games/").remove(entity.$key));
  }

  Get(id: string): Observable<Game> {
    return this.db.object<Game>("/Games/" + id).valueChanges();
  }

  GetAll(): Observable<Game[]> {
    return this.db.list("/Games").valueChanges().pipe(map((games: Game[]) => {
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
    }));
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

  GetAllPaginated(amountToLoad: number, lastDateValue: string = null): Observable<Game[]> {
    let query = this.db.list<Game>("/Games", ref => ref.orderByChild("Datetime").limitToLast(amountToLoad));

    if (lastDateValue) {
      query = this.db.list<Game>("/Games", ref => ref.orderByChild("Datetime").endAt(lastDateValue).limitToLast(amountToLoad));
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
    return undefined;
  }

  SaveGame(entity: GameEntity): Observable<void> {
    return concat(
      this.playerService.AddWin(entity.WinningTeam.Players[0]),
      this.playerService.AddWin(entity.WinningTeam.Players[1]),
      this.playerService.AddLoss(entity.LosingTeam.Players[0]),
      this.playerService.AddLoss(entity.LosingTeam.Players[1]),
      from(this.db.list("/Games").push({
          WinningTeam: {
            Players: {
              [entity.WinningTeam.Players[0].$key]: true,
              [entity.WinningTeam.Players[1].$key]: true,
            },
            Score: entity.WinningTeam.Score
          },
          LosingTeam: {
            Players: {
              [entity.LosingTeam.Players[0].$key]: true,
              [entity.LosingTeam.Players[1].$key]: true,
            },
            Score: entity.LosingTeam.Score
          },
          Location: entity.Location,
          Datetime: entity.GameTime
        })
      )).pipe(take(1));
  }

  Update(entity: GameEntity): Observable<void> {
    return undefined;
  }
}
