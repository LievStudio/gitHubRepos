import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoComponent } from './repo-list/repo/repo.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoState } from './store/repo.state';

const routes: Routes = [
  { path: '', component: RepoListComponent },
  { path: 'repo/:name', component: RepoDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    RepoComponent,
    RepoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([RepoState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
