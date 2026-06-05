import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createAnimation } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  nombreUsuario : string = "";
  password : string = "";
  fecha : string = "";

  

  mostrar() {
    alert(this.fecha);
    const elementToAnimate = document.querySelector("#datosUsuario");

    if(elementToAnimate != null) {
        const pulseAnimation = createAnimation()
        .addElement(elementToAnimate)
        .duration(1500)
        .iterations(Infinity)
        //.direction('alternate')
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0.2');

      pulseAnimation.play();      
    }
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.activeRoute.queryParams.subscribe(params => {
      if(this.router.currentNavigation()?.extras.state) {
        this.nombreUsuario = this.router.currentNavigation()?.extras?.state?.['nombreUsuario'];
        this.password = this.router.currentNavigation()?.extras?.state?.['password'];
      }
      else {
        this.router.navigate(["/login"]);
      }
    });
  }
}
