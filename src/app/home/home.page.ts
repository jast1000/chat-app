import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}

  login(userInfo: any) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.router.navigateByUrl('/chat-room');
  }

}
