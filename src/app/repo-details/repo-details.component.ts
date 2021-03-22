import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import { RepoModel } from '../models/repo.model';
import { RepoState } from '../store/repo.state';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit, OnDestroy {
  @Select(RepoState.selectedRepo) private selectedRepo$!: Observable<string>;

  selectedRepoName!: string;
  selectedRepoOwner!: string;
  selectedRepoDesc: string = '';

  issues!: { title: string; author: { login: string } }[];

  error!: string | undefined;

  querySubscription!: Subscription;

  loading: boolean = true;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.selectedRepo$.subscribe((repo: any) => {
      this.selectedRepoName = repo.repoName;
      this.selectedRepoOwner = repo.repoOwner;

      console.log(this.selectedRepoName);

      let query: any = gql`
        query {
          repository(name: "${this.selectedRepoName}", owner: "${this.selectedRepoOwner}") {
            name
            description
            issues(first: 5) {
              edges {
                node {
                  author {
                    login
                  }
                  title
                }
              }
            }
          }
        }
      `;

      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: query,
        })
        .valueChanges.subscribe(({ data, loading, error }) => {
          this.loading = loading;
          this.selectedRepoDesc = data.repository.description;
          this.issues = data.repository.issues.edges.map((issue: any) => {
            return issue.node;
          });
          this.error = error?.message;
        });
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
