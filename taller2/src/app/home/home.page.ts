import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service';
import { Sesion } from '../model/sesion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  sesion: Sesion = { usuario: "", password: "" };  

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    this.sesion = (await this.storage.getSesion())!;
  }
}
