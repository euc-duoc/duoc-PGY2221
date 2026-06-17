import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storageservice';
import { ToastController } from '@ionic/angular';
import { DBService } from '../services/dbservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  usuarios : any[] = [];
  user: any = {
    usuario: "",
    password: ""
  };

  constructor(
    private router: Router,
    private storage: StorageService,
    private dbService: DBService,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    this.usuarios = await this.storage.get("usuarios");
  }

  async ingresarConStorage() {
    if(this.validarDatos()) {
      for(let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].nombre == this.user.usuario && this.usuarios[i].password == this.user.password) {
          this.ingresar();
          return;
        }
      }

      this.toast("Usuario no existe");
    }    
  }

  async ingresarConSqlite() {
    if(this.validarDatos()) {
      if(await this.dbService.existeUsuario(this.user.usuario, this.user.password)) {
        this.ingresar();
        return;
      }

      this.toast("Usuario no existe");
    }    
  }

  private validarDatos() {
    if(this.user.usuario == "") {
      this.toast("Debe ingresar un nombre de usuario");
      return false;
    }
      
    if(this.user.password == "") {
      this.toast("Debe ingresar una contraseña");
      return false;
    }

    return true;
  }

  private ingresar() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };

    this.router.navigate(["/home"], navigationExtras);
  }

  async toast(mensaje: string) { 
    const toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 3000 
    }); 
    toast.present(); 
  }
}
