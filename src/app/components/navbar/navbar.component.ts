import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public af:AngularFire,
    public router:Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.af.auth.login();
    //af.auth.login({ email: 'email', password: 'pass' });
  }

  logout(){
    this.af.auth.logout();
    this.router.navigate(['/']);
    //this.flashMessage.show('You are logged out',{cssClass: 'alert-success', timeout: 3000});
  }



}
