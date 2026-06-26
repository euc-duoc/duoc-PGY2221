import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<GuardResult> {
    if(await this.storage.existeSesionActiva())
      return true;

    return this.router.parseUrl('/');
  }
  
}
