import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  pizzas: FirebaseListObservable<any[]>;
  pizza: FirebaseObjectObservable<any>;
  folder: any;


  constructor(private af: AngularFire) {
    this.folder = 'pizzaimages';
    this.pizzas = this.af.database.list('/pizzas') as FirebaseListObservable<Pizza[]>;
  }

  getPizzas(){
    return this.pizzas;
  }

  getPizzaDetails(id){
    this.pizza = this.af.database.object('/pizzas/'+id) as FirebaseObjectObservable<Pizza>;
    return this.pizza;
    //console.log(listing);
  }

  addPizza(pizza){
    let storageRef = firebase.storage().ref();
    for ( let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) =>{
        pizza.image = selectedFile.name;
        pizza.path = path;
        return this.pizzas.push(pizza);
      })
    }
  }

  updatePizza(id, pizza){
    //return this.pizza.update(id, pizza);
  }

  deletePizza(id){
    //return this.pizza.remove(id);
  }

}

interface Pizza{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  size?:string;
  owner?:string;
  mushrooms?:string;
  bacon?:string;
  cheese?:string;
  olive?:string;
  price?:string;
  path?:string;
}
