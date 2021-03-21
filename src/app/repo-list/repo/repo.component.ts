import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  repo: any;

  @Input() set repo_item(repo: any) {
    this.repo = repo;
  }

  constructor() {}

  ngOnInit(): void {}
}
