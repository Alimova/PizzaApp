import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  //styleUrls: ['./add-pizza.component.css'],
  styleUrls: ['./add-pizza.component.sass']
})
export class AddPizzaComponent implements OnInit {
  @ViewChild('pizzabase') canvasRef: ElementRef;
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

  ngOnInit() {
    this.mushrooms = false;
    this.bacon = false;
    this.cheese = false;
    this.olive = false;
    this.price = 20;
    this.size = "Medium";
    this.owner = this.firebaseService.getCurrentUserName();
    //this.uid = this.firebaseService.getCurrentUserId();
    this.displayImageCanvas(0, "assets/img/pizza_base.jpg");
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
    //Canvas2Image.saveAsPNG(canvas);
  }

  displayImageCanvas(zIndex,src){
    let canvas = this.canvasRef.nativeElement;
    let context = canvas.getContext('2d');

    let source =  new Image();

    source.onload = () => {
      canvas.height = source.height;
      canvas.width = source.width;
      context.drawImage(source, 0, 0);

      this.image = canvas.toDataURL();
    };
    source.style.zIndex = zIndex;
    source.src = src;
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
    this.price = ((this.mushrooms ? 10 : 0)
    + (this.cheese ? 9 : 0)
    + (this.olive ? 8 : 0)
    + (this.bacon ? 7 : 0)
    + sizePrice);
  }


}

interface Canvas{

}
