import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storageservice';
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    this.usuarios = await this.storage.get("usuarios");
    console.log(this.usuarios);
  }

  ingresar() {
    this.usuarios.forEach((u) => {
      if(u.nombre == this.user.usuario && u.password == this.user.password) {
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        };

        this.router.navigate(["/home"], navigationExtras);        
        return;
      }
    })
    
    this.toast("Usuario no existe");
  }

  async toast(mensaje: string) { 
    const toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 3000 
    }); 
    toast.present(); 
  }
}
