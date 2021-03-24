import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoGuard } from './repo-guard.service';
import { RepoListComponent } from './repo-list/repo-list.component';

const routes: Routes = [
  { path: '', component: RepoListComponent },
  {
    path: 'repo/:name',
    component: RepoDetailsComponent,
    canActivate: [RepoGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
