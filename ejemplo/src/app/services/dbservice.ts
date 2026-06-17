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
  crearUsuario: string = "INSERT OR IGNORE INTO usuario VALUES ('test', '1234');";

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
      try {
          this.sqlite.create({ 
          name: 'usuarios.db', 
          location: 'default'  
        }).then((db: SQLiteObject) => { 
          this.database = db; 
          this.presentToast("BD Creada"); 
          this.crearTablas(); 
        }).catch(e => this.presentToast(e)); 
      }
      catch(e) {
        this.presentToast("Servicio SQLite no disponible");
      }      
    }) 
  }

  async crearTablas() { 
    try { 
      await this.database.executeSql(this.tablaUsuarios, []);
      this.presentToast("Tabla Usuarios Creada");
      await this.database.executeSql(this.crearUsuario, []);
      this.presentToast("Usuario creado");
      this.isDbReady.next(true); 
    } catch (e) { 
      this.presentToast("error creartabla " + e); 
    } 
  }

  async existeUsuario(nombre: string, pass: string) {
    if(this.database != null) {
      let res = await this.database.executeSql(
        `SELECT * FROM usuario WHERE nombre = '${nombre}' AND password = '${pass}';`, []
      );

      if (res.rows.length > 0)
        return true;
      else
        return false;
    }

    return false;
  }

  async presentToast(mensaje: string) { 
    const toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 3000 
    }); 
    toast.present(); 
  }
}