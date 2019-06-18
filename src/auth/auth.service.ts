import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from "firebase/app";
import {Observable} from "rxjs/Observable";
import {from} from "rxjs"
import {Facebook} from "@ionic-native/facebook";
import {Storage} from "@ionic/storage";
import CONSTANTS from "../static/constants";
import { Player } from "../players/player.model";

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private facebook: Facebook, private storage: Storage) {}

  public getUser(): Observable<User> {
    return from(this.storage.get(CONSTANTS.LOCAL_STORAGE.CURRENT_USER))
    
  }

  public saveUser(user: User): Observable<void> {
    return from(this.storage.set(CONSTANTS.LOCAL_STORAGE.CURRENT_USER, "Robbie"))
  }

  public signOut(): Promise<any> {
    return Promise.all([this.facebook.logout(), this.afAuth.auth.signOut()])
  }
}
