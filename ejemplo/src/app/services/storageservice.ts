import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService { 

  constructor(private storage: Storage) { 
    this.storage.create();
    this.init();
  }

  init() {
    this.set("usuarios", [
      { nombre: "test", password: "1234"},
      { nombre: "hola", password: "4321"}
    ])
  }

  async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this.storage?.get(key);
  }
}
