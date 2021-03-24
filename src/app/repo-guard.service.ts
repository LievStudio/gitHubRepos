import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RepoState, RepoStateModel } from './store/repo.state';

@Injectable({ providedIn: 'root' })
export class RepoGuard implements CanActivate {
  private isRepoSelected!: boolean;

  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.isRepoSelected = this.store.selectSnapshot(RepoState.isRepoSelected);
    if (this.isRepoSelected) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
