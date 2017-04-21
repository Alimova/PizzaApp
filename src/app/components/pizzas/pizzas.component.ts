import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {
  pizzas:any;
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    })
  }

}
