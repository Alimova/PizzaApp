import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service'

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
      //console.log(pizzas);
      this.pizzas = pizzas;
    })
  }

  login(){
    this.af.auth.login();
  }

}
