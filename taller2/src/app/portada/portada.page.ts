import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
  standalone: false
})
export class PortadaPage implements OnInit {
  user: any = {
    usuario: "",
    password: ""
  };

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async ingresar() {
    if(this.validarDatos()) {
      if(await this.storage.iniciarSesion(this.user.usuario, this.user.password)) {
        this.router.navigate(["/home"]);
        return;
      }

      alert("Usuario no existe");
    }    
  }

  private validarDatos() {
    if(this.user.usuario == "") {
      alert("Debe ingresar un nombre de usuario");
      return false;
    }
      
    if(this.user.password == "") {
      alert("Debe ingresar una contraseña");
      return false;
    }

    return true;
  }
}