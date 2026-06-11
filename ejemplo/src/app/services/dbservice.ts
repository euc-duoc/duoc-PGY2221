import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  public database!: SQLiteObject;

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(nombre TEXT PRIMARY KEY, password VARCHAR(4) NOT NULL);";
  crearUsuario: string = "INSERT INTO usuario VALUES ('test', '1234');";

  usuarios = new BehaviorSubject<any[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false); 

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.crearBD();
  }

  dbState() { 
    return this.isDbReady.asObservable(); 
  }

  crearBD() { 
    this.platform.ready().then(() => { 
      this.sqlite.create({ 
        name: 'usuarios.db', 
        location: 'default'  
      }).then((db: SQLiteObject) => { 
        this.database = db; 
        this.presentToast("BD Creada"); 
        this.crearTablas(); 
      }).catch(e => this.presentToast(e)); 
    }) 
  }

  async crearTablas() { 
    try { 
      await this.database.executeSql(this.tablaUsuarios, []);
      this.presentToast("Tabla Usuarios Creada");
      await this.database.executeSql(this.crearUsuario, []);
      this.presentToast("Usuario creado");
      this.cargarUsuarios(); 
      this.presentToast("Usuarios cargados");
      this.isDbReady.next(true); 
    } catch (e) { 
      this.presentToast("error creartabla " + e); 
    } 
  }

  cargarUsuarios() { 
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => { 
      let usuarios = []; 
      if (res.rows.length > 0) { 
        for (let i = 0; i < res.rows.length; i++) {
          usuarios.push({ 
            nombre: res.rows.item(i).nombre, 
            titulo: res.rows.item(i).password
          }); 
        } 
      }

      this.usuarios.next(usuarios); 
    }); 
  } 

  getUsuarios() {
    return this.usuarios.asObservable(); 
  }

  async presentToast(mensaje: string) { 
    const toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 3000 
    }); 
    toast.present(); 
  }
}