import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import { RepoModel } from '../models/repo.model';
import { IssueModel } from '../models/issue.model';
import { RepoState, RepoStateModel } from '../store/repo.state';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit, OnDestroy {
  @Select(RepoState.selectedRepo)
  private selectedRepo$!: Observable<RepoStateModel>;

  selectedRepo: RepoModel = {
    __typeName: '',
    name: '',
    description: '',
    owner: { login: '' },
  };

  issues!: IssueModel[];

  error: string | undefined;

  querySubscription!: Subscription;

  loading!: boolean;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.selectedRepo$.subscribe((repo: RepoStateModel) => {
      this.selectedRepo.name = repo.repoName;
      this.selectedRepo.owner.login = repo.repoOwner;

      let query: any = gql`
        query {
          repository(name: "${this.selectedRepo.name}", owner: "${this.selectedRepo.owner.login}") {
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
          this.selectedRepo.description = data.repository.description;
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
