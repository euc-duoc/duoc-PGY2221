import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthService } from '../service/auth-service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,    
    children: [
      {
        path: 'persistencia',
        loadChildren: () => import('./persistencia/persistencia.module').then(m => m.PersistenciaPageModule),
        canActivate: [ AuthService ]
      },
      {
        path: 'api',
        loadChildren: () => import('./api/api.module').then(m => m.ApiPageModule),
        canActivate: [ AuthService ]
      },
      {
        path: 'camara',
        loadChildren: () => import('./camara/camara.module').then(m => m.CamaraPageModule),
        canActivate: [ AuthService ]
      },
      {
        path: '',
        redirectTo: '/home/persistencia',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
