import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  id: any;
  pizza: any;
  imageUrl: any;
  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getPizzaDetails(this.id).subscribe(pizza => {
      this.pizza = pizza;

      let storageRef = firebase.storage().ref();
      storageRef.child(pizza.path).getDownloadURL().then((url) =>{
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      })
    });
  }

  onDeleteClick(){
    this.firebaseService.deletePizza(this.id);
    this.router.navigate(['/pizzas']);
  }

}
