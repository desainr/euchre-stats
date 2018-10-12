import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from "firebase/app";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  public getUser(): Observable<User> {
    return this.afAuth.user;
  }

  public async signOut() {
    return await this.afAuth.auth.signOut();
  }
}
