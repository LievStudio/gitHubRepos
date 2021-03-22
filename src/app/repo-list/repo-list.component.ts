import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { RepoModel } from '../models/repo.model';

const GET_REPOS = gql`
  {
    search(type: REPOSITORY, query: "GraphQL", first: 10) {
      edges {
        node {
          ... on Repository {
            name
            description
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss'],
})
export class RepoListComponent implements OnInit, OnDestroy {
  repoList!: RepoModel[];
  loading: boolean = true;
  error: string | undefined;

  private querySubscription!: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_REPOS,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.repoList = data.search.edges.map((repo: any) => {
          return repo.node;
        });
        this.error = error?.message;
        // console.log(data.search.edges);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
