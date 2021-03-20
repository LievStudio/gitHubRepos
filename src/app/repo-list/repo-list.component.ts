import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_REPOS = gql`
  query {
    repositoryOwner(login: "LievStudio") {
      repositories(last: 10) {
        edges {
          node {
            name
            description
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
  repoList: any;
  loading: boolean = true;

  private querySubscription: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_REPOS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.repoList = data.repositoryOwner.repositories.edges.map(
          (repo: any) => {
            return repo.node;
          }
        );
        // console.log(data.repositoryOwner.repositories.edges);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
