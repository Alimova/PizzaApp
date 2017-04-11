import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  //styleUrls: ['./add-pizza.component.css'],
  styleUrls: ['./add-pizza.component.sass']
})
export class AddPizzaComponent implements OnInit {
  title?:any;
  type?:any;
  image?:any;
  size?:any;
  owner?:any;
  mushrooms?:any;
  bacon?:any;
  cheese?:any;
  olive?:any;
  price?:any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mushrooms = false;
    this.bacon = false;
    this.cheese = false;
    this.olive = false;
    this.price = 20;
    this.size = "Medium";
  }

  onAddSubmit(){
    let pizza = {
      title: this.title,
      size: this.size,
      owner: this.owner,
      mushrooms: this.mushrooms,
      bacon: this.bacon,
      cheese: this.cheese,
      olive: this.olive,
      price: this.price,
      type: this.type
    }
    this.firebaseService.addPizza(pizza);
    this.router.navigate(['/pizzas']);
  }

}
