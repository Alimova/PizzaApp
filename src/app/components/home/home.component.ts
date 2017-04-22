import { Component, OnInit, AfterViewInit} from '@angular/core';
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
        //pizza.url = this.getImageUrl(pizza.path);
        this.loadedImg();
        //console.log(pizza.url);
      });
      this.pizzas = pizzas;
    })
    ;
  }

  loadedImg() {
    debugger;
    let imgs = document.getElementsByTagName("img");
    //alert(imgs.length);
    for(let i=0;imgs.length;i++){
      imgs[i].src = this.getImageUrl(imgs[i].src);
      console.log(imgs[i].src)
    }
  }

  getImageUrl(path){
    let imgUrl = "";
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child(path);
    storageRef.child(path).getDownloadURL().then((url) =>{
      imgUrl = url;
      document.getElementsByTagName("img")[0].src = imgUrl;
      console.log(document.getElementsByTagName("img")[0]);
      return url;
    }).catch((error) => {
      //imgUrl = "alert('error')"
    });
    //debugger;
    return imgUrl;
  }

  login(){
    this.af.auth.login();
  }

}
//
//export class HomeComponent implements AfterViewInit {
//
//
//}
