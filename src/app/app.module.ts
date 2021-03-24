import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AppRouterModule } from './app.router.module';
import { HttpClientModule } from '@angular/common/http';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoComponent } from './repo-list/repo/repo.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoState } from './store/repo.state';

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
    AppRouterModule,
    HttpClientModule,
    NgxsModule.forRoot([RepoState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
