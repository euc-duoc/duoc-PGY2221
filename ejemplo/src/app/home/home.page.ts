import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  data: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.data = authService.getUser();
  }
}
