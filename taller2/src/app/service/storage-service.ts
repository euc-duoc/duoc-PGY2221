import { Injectable } from '@angular/core';
import { Sesion } from '../model/sesion';
import { DBService } from './dbservice';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private db: DBService,
    private _storage: Storage
  ) {
    this._storage.create();
  }

  async getSesion(): Promise<Sesion | null> {
    return await this._storage.get("sesion");
  }

  async existeSesionActiva() : Promise<boolean> {
    if(this.getSesion() == null)
      return false;

    return true;
  }

  async iniciarSesion(user: string, password: string) : Promise<boolean> {
    if(await this.db.existeUsuario(user, password)) {
      await this._storage?.set('sesion', {
        usuario: user,
        password: password
      });
      
      return true;
    }
    
    return false;
  }
}
