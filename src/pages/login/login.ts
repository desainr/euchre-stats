import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase/app";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AuthService} from "../../auth/auth.service";
import {Facebook} from "@ionic-native/facebook";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  text: string;

  constructor(public navCntrl: NavController, private afAuth: AngularFireAuth, private authService: AuthService, public facebook: Facebook) {}

  public login() {
    this.facebook.login(['email'])
      .then((response) => {
        const facebookCredential = auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        this.afAuth.auth.signInWithCredential(facebookCredential)
          .then(firebaseUser => {
            this.authService.saveUser(firebaseUser).subscribe(() => this.navCntrl.push(TabsPage));
          });

      }).catch((error) => {
      console.log(error)
    });
  }
}
