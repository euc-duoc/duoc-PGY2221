import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  nombreUsuario : string = "";
  password : string = "";

  ingresar() {
    if(this.nombreUsuario === "") {
      alert("Nombre de usuario vacío.");
      return;
    }

    if(this.password === "" && this.password.length < 4) {
      alert("Contraseña vacía.");
      return;
    }

    if(this.password.length < 4) {
      alert("Contraseña debe tener al menos 4 caracteres.");
      return;
    }

    let navigationExtras: NavigationExtras = {
      state: {
        nombreUsuario: this.nombreUsuario,
        password: this.password
      }
    };

    this.router.navigate(["/home"], navigationExtras);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
