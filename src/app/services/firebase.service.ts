import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  pizzas: FirebaseListObservable<any[]>;
  pizza: FirebaseObjectObservable<any>;
  folder: any;
  uid:any;
  uname:any;


  constructor(private af: AngularFire) {
    this.folder = 'pizzaimages';
    this.pizzas = this.af.database.list('/pizzas') as FirebaseListObservable<Pizza[]>;
    this.af.auth.subscribe((user:FirebaseAuthState) => this.onUserStateChange(user));
    //todo: generate name for image - it overrides images with same names
  }

  onUserStateChange(user: FirebaseAuthState) {
    this.uid = user.google.uid;
    this.uname = user.google.displayName;
  }

  getPizzas(){
    return this.pizzas;
  }

  getPizzaDetails(id){
    this.pizza = this.af.database.object('/pizzas/'+id) as FirebaseObjectObservable<Pizza>;
    return this.pizza;
  }

  addPizza(pizza){
    let storageRef = firebase.storage().ref();
    let path = `/${this.folder}/${pizza.title+".png"}`;
    console.log(pizza);                                 //todo
    let iRef = storageRef.child(path);
    iRef.put(pizza.image).then((snapshot) =>{
      console.log("snap: "+pizza);                       //todo
      pizza.image = pizza.title+".png";
      pizza.path = path;
      return this.pizzas.push(pizza);
    })

    //uploadTask.on('state_changed', function(snapshot){
    //  // Observe state change events such as progress, pause, and resume
    //  // See below for more detail
    //}, function(error) {
    //  console.log(error);
    //  // Handle unsuccessful uploads
    //}, function() {
    //  // Handle successful uploads on complete
    //  pizza.image = pizza.title+".png";
    //  pizza.path = path;
    //  return this.pizzas.push(pizza);
    //  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //  //var downloadURL = uploadTask.snapshot.downloadURL;
    //});

    //***for image upload***
    //let storageRef = firebase.storage().ref();
    //for ( let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
    //  let path = `/${this.folder}/${pizza.title+"_"+selectedFile.name}`;
    //  let iRef = storageRef.child(path);
    //  iRef.put(selectedFile).then((snapshot) =>{
    //    pizza.image = selectedFile.name;
    //    pizza.path = path;
    //    return this.pizzas.push(pizza);
    //  })
    //}
  }

  updatePizza(id, pizza){
    return this.pizzas.update(id, pizza);
  }

  deletePizza(id){
    return this.pizzas.remove(id);
  }

  getCurrentUserName(){
    //todo: this.af.auth.subscribe(this.onUserStateChange(user));
      return this.uname;
  }

  getCurrentUserId(){
    return this.uid;
  }

}

interface Pizza{
  $key?:string;
  title?:string;
  type?:string;
  image?:any;
  size?:string;
  uid?:string;
  owner?:string;
  mushrooms?:string;
  bacon?:string;
  cheese?:string;
  olive?:string;
  price?:string;
  path?:string;
}


