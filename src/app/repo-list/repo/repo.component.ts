import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RepoModel } from 'src/app/models/repo.model';
import { SelectRepo } from 'src/app/store/repo.state';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  repo!: RepoModel;

  @Input() set repo_item(repo: RepoModel) {
    this.repo = repo;
  }

  constructor(private store: Store) {}

  ngOnInit(): void {}

  selectRepo(repo: RepoModel) {
    this.store.dispatch(new SelectRepo(repo.name, repo.owner.login));
  }
}
