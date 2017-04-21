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
  @ViewChild('pizzadiv') pizzaDiv: ElementRef;
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
  complete?:any;

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
    this.displayImageCanvas(0, "assets/img/pizza_base.jpg", "pizzabase");
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
      uid: this.firebaseService.getCurrentUserId(),
      complete: false
    };
    console.log(pizza);
    this.mergeCanvas();
    this.firebaseService.addPizza(pizza,this.image);

    this.router.navigate(['/pizzas']);
  }

  mergeCanvas(){
    let el = this.pizzaDiv.nativeElement;
    for(let i=1;i<el.children.length;i++){
      el.children[0].getContext('2d').drawImage(el.children[i], 95, 95);
    }
    this.image = el.children[0].toDataURL("image/png");
  }

  checkMushrooms(){
    let el = this.pizzaDiv.nativeElement;
    if(!!el.children.mushrooms){
      el.removeChild(el.children.mushrooms);
    }
    else{
      this.displayImageCanvas(1, 'assets/img/mushrooms.png', 'mushrooms');
    }
  }

  checkBacon(){
    let el = this.pizzaDiv.nativeElement;
    if(!!el.children.bacon){
      el.removeChild(el.children.bacon);
    }
    else{
      this.displayImageCanvas(1, 'assets/img/bacon.png', 'bacon');
    }
  }

  checkOlive(){
    let el = this.pizzaDiv.nativeElement;
    if(!!el.children.olive){
      el.removeChild(el.children.olive);
    }
    else{
      this.displayImageCanvas(1, 'assets/img/olive.png', 'olive');
    }
  }

  checkCheese(){
    let el = this.pizzaDiv.nativeElement;
    if(!!el.children.cheese){
      el.removeChild(el.children.cheese);
    }
    else{
      this.displayImageCanvas(1, 'assets/img/cheese.png', 'cheese');
    }
  }

  displayImageCanvas(zIndex,src, id){
    let canvas = this.loadCanvas(id);
    let context = canvas.getContext('2d');

    let source =  new Image();

    source.onload = () => {
      canvas.height = source.height;
      canvas.width = source.width;
      context.drawImage(source, 0, 0);
      if(zIndex>0){
        canvas.style.top = "100px";
        canvas.style.left = "100px";
      }
    };
    source.src = src;
  }

  loadCanvas(id) {
    var canvas = document.createElement('canvas');
    var div = this.pizzaDiv.nativeElement;
    canvas.id = id;
    canvas.style.position = "absolute";
    div.appendChild(canvas);
    return canvas;
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


