import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storageservice';
import { ToastController } from '@ionic/angular';
import { DBService } from '../services/dbservice';

// Para probar storage vs sqlite
const PERSISTENCIA_USUARIOS: string = "sqlite";

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
    if(PERSISTENCIA_USUARIOS != "sqlite")
      this.usuarios = await this.storage.get("usuarios");
  }

  async ingresar() {
    if(await this.dbService.existeUsuario(this.user.usuario, this.user.password)) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        }
      };

      this.router.navigate(["/home"], navigationExtras);
    }
    else {
      this.toast("Usuario no existe");
    }
  }

  async toast(mensaje: string) { 
    const toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 3000 
    }); 
    toast.present(); 
  }
}
