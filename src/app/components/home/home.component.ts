import { Component, OnInit} from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pizzas:any;
  constructor(
    public af:AngularFire,
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getPizzas().subscribe(pizzas => {
      pizzas.forEach(pizza => {
        this.getImageUrl(pizza);
      });
      this.pizzas = pizzas;
      console.log(this.pizzas);
    });
  }

  getImageUrl(pizza){
    let storageRef = firebase.storage().ref();
    storageRef.child(pizza.path).getDownloadURL().then((url) =>{
      pizza.url = url;
      return url;
    }).catch((error) => {
       alert(error);
    });
  }

  login(){
    this.af.auth.login();
  }

}
