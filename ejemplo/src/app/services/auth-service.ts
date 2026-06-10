import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  user: any = null;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router
	) {
		this.activeRoute.queryParams.subscribe(params => {
			if(this.router.currentNavigation()?.extras.state) {
				this.user = this.router.currentNavigation()?.extras?.state?.['user'];
				console.log(this.user);
			}
			else {
				this.user = null;
			}
		});
	}

	getUser() {
		return this.user;
	}

	canActivate(): MaybeAsync<GuardResult> {
		if(this.user != null)
			return true;
		else
			return this.router.parseUrl('/');
	}
}
