import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  data: any = {};
  poemas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.data = authService.getUser();
  }

  async ngOnInit() {
    this.http.get(
      "https://poetrydb.org/random/3/title"
    )
    .subscribe({
      next: (res: any) => {
        for(let i = 0; i < res.length; i++) {
          this.poemas.push(res[i].title);
        }

        console.log(this.poemas);
      }
    })
  }

  async tomarFoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        includeMetadata: true,
      });

      // result.webPath can be set directly as the src of an image element
      let elem : HTMLImageElement = document.getElementById("resultadoFoto")! as HTMLImageElement;
      console.log(elem);
      elem.src = result.webPath!;
    } catch (e) {
      const error = e as any;
      const message = error.code ? `[${error.code}] ${error.message}` : error.message;
      console.error('takePhoto failed:', message);
    }
  };
}
