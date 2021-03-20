import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_REPO = gql`
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
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit {
  // selectedRepo has to be defined from ngxs store
  selectedRepo: { __typeName: string; name: string; description: string } = {
    __typeName: 'Repository',
    name: 'algorithms-data-structures',
    description:
      'Repo for js snippets that serve as reminders/examples for common algorithms, recursion, sorting and data structures',
  };

  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
