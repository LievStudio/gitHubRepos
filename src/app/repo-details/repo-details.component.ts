import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { RepoModel } from '../models/repo.model';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit, OnDestroy {
  // selectedRepo has to be defined from ngxs store
  selectedRepo: RepoModel = {
    __typeName: 'Repository',
    name: 'algorithms-data-structures',
    description:
      'Repo for js snippets that serve as reminders/examples for common algorithms, recursion, sorting and data structures',
  };

  contributors!: { name: string }[];

  querySubscription!: Subscription;

  query: any = gql`
    query {
      repository(name: "${this.selectedRepo.name}", owner: "LievStudio") {
        collaborators(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `;

  loading: boolean = true;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.query,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.contributors = data.repository.collaborators.edges.map(
          (contributor: any) => {
            return contributor.node;
          }
        );
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
