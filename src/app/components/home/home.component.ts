import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pizzas:any;
  pizza: any;
  constructor(
    public af:AngularFire,
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.firebaseService.getPizzas().subscribe(pizzas => {
      pizzas.forEach(pizza => {
        this.getImageUrl(pizza);
      });
      this.pizzas = pizzas.filter(function(pizza){
        return (pizza.complete == false);
      });
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

  onCompleteClick(id){
    //alert(id);
    this.firebaseService.getPizzaDetails(id).subscribe(pizza => {
      this.pizza = pizza;
    });
    this.pizza.complete = true;
    //debugger;
    this.firebaseService.updatePizza(id, this.pizza);
    //this.router.navigate(['/pizzas']);
  }

  matchUid(uid){
    return (uid == this.firebaseService.getCurrentUserId())

  }

  login(){
    this.af.auth.login();
    this.router.navigate(['/']);
  }

}
