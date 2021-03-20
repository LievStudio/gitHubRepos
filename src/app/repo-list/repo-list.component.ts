import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_REPO_COUNT = gql`
  {
    search(query: "is:public", type: REPOSITORY, first: 50) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
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
        query: GET_REPO_COUNT,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data);
        // this.repoList = data;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
