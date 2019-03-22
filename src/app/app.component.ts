import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'findMyBikeApp';

  constructor()
  {
    var config = {
      apiKey: "AIzaSyASb5jZVGQZqQ-395zmvItusJmwe8gg5kw",
      authDomain: "findmybike-3772d.firebaseapp.com",
      databaseURL: "https://findmybike-3772d.firebaseio.com",
      projectId: "findmybike-3772d",
      storageBucket: "findmybike-3772d.appspot.com",
      messagingSenderId: "420532581460"
    };
    firebase.initializeApp(config);

  }
}
