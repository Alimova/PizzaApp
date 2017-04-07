import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddPizzaComponent } from './components/add-pizza/add-pizza.component';
import { EditPizzaComponent } from './components/edit-pizza/edit-pizza.component';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { PizzaComponent } from './components/pizza/pizza.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBADbUWiVMUeizBkhVhUHJSkqzH0l667_Q",
  authDomain: "pizzaapp-f8f63.firebaseapp.com",
  databaseURL: "https://pizzaapp-f8f63.firebaseio.com",
  //projectId: "pizzaapp-f8f63",
  storageBucket: "pizzaapp-f8f63.appspot.com",
  messagingSenderId: "159520462712"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'pizzas', component:PizzasComponent},
  {path: 'pizza/:id', component:PizzaComponent},
  {path: 'add-pizza', component:AddPizzaComponent},
  {path: 'edit-pizza/:id', component:EditPizzaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddPizzaComponent,
    EditPizzaComponent,
    PizzasComponent,
    PizzaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
