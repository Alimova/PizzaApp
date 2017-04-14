import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  //styleUrls: ['./add-pizza.component.css'],
  styleUrls: ['./add-pizza.component.sass']
})
export class AddPizzaComponent implements OnInit {
  @ViewChild('pizza') canvas;
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
  //uid?:any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }



  drawPizza(){
    //var canvas = document.getElementById('pizzabase'),
    //context = this.canvas.getContext('2d');
    console.log(document.getElementById("pizza"));
    //console.log(this.canvas.getContext("2d"));
    //var base_image = new Image();
    //base_image.src = 'assets/img/pizza_base.jpg';
    //context.drawImage(base_image, 488, 495);

  }

  ngOnInit() {
    this.mushrooms = false;
    this.bacon = false;
    this.cheese = false;
    this.olive = false;
    this.price = 20;
    this.size = "Medium";
    this.owner = this.firebaseService.getCurrentUserName();
    //this.uid = this.firebaseService.getCurrentUserId();
    //this.firebaseService.getCurrentUserName().subscribe(uname => {
    //  this.owner = uname;
    //})

    //this.drawPizza();

  }



  onAddSubmit(){
    let pizza = {
      title: this.title,
      size: this.size,
      owner: this.firebaseService.getCurrentUserName(),
      mushrooms: this.mushrooms,
      bacon: this.bacon,
      cheese: this.cheese,
      olive: this.olive,
      price: this.price,
      type: this.type,
      uid: this.firebaseService.getCurrentUserId()
    }
    this.firebaseService.addPizza(pizza);
    this.router.navigate(['/pizzas']);
    //this.calcPizzaPrice()
  }

  mergeLayers(){
    var canvas0 = document.getElementById("pizza");
    //var context0 = canvas0.getContext('2d');

    var canvas1 = document.getElementById("mushrooms");
    console.log(canvas1);
    //var context1 = canvas1.getContext('2d');

// references to layer2
    var canvas2 = document.getElementById("cheese");
    //var context2 = canvas2.getContext('2d');

// references to layer3
    var canvas3 = document.getElementById("olive");
    //var context3 = canvas3.getContext('2d');
// references to layer4
    var canvas4 = document.getElementById("olive");
    //var context4 = canvas4.getContext('2d');

    //context0.drawImage(canvas1,0,0);
    //context0.drawImage(canvas2,0,0);
    //context0.drawImage(canvas3,0,0);
    //context0.drawImage(canvas4,0,0);
    //
    //var img=new Image();
    //img.onload=function(){
    //  document.getElementById("results").src=img.src;
    //}
    //img.src=canvas0.toDataURL();
  }

  calcPizzaPrice(){
    var sizePrice = 0;
    switch (this.size){
      case "Small": sizePrice=15;
        break;
      case "Medium": sizePrice=20;
        break;
      case "Big": sizePrice=30;
        break;
      default: sizePrice=0;
    }
    var price = ((this.mushrooms ? 10 : 0)
    + (this.cheese ? 9 : 0)
    + (this.olive ? 8 : 0)
    + (this.bacon ? 7 : 0)
    + sizePrice);
    this.price = price;
    //return price;
  }


}
