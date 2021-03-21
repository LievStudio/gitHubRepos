import { Component, Input, OnInit } from '@angular/core';
import { RepoModel } from 'src/app/models/repo.model';

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

  constructor() {}

  ngOnInit(): void {}
}
