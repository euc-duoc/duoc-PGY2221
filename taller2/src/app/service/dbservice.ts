import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private database: SQLiteObject | null = null;
  private dbLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) { 
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({ 
        name: 'ejemplo.db',
        location: 'default' 
      }).then((db: SQLiteObject) => {
        this.database = db;
        console.log("BD Creada");
        this.crearTabla();
      }).catch((e) => {
        this.dbLista.next(false);
        console.log("Error al crear DB: " + e); 
      })
    });
  }

  dbState() {
    return this.dbLista;
  }

  async crearTabla() {
    if(this.database != null) {
      try {
        await this.database.executeSql("CREATE TABLE IF NOT EXISTS usuario(user TEXT PRIMARY KEY, password TEXT NOT NULL);", []);
        await this.database.executeSql("INSERT OR IGNORE INTO usuario VALUES ('user', '1234');", []);
        await this.database.executeSql("INSERT OR IGNORE INTO usuario VALUES ('user2', '5678');", []);
        this.dbLista.next(true);
      } 
      catch (error) {
        console.error(error);
      } 
    }
    else {
      this.dbLista.next(false);
    }
  }
  
  async existeUsuario(user: string, password: string) : Promise<boolean> {
    if(!this.platform.is('cordova')) {
      if(user != "user" || password != "1234")
        return false;

      return true;
    }

    if(this.database != null) {
      let res = await this.database.executeSql(
        `SELECT user FROM usuario WHERE user=? AND password=?;`, [user, password]
      );

      if(res.rows.length > 0) 
        return true;        
    }

    return false;
  } 
}
