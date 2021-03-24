import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

export interface RepoStateModel {
  repoName: string;
  repoOwner: string;
}

export class SelectRepo {
  static readonly type = '[Repo] Repository Selected';
  constructor(public repoName: string, public repoOwner: string) {}
}

@State<RepoStateModel>({
  name: 'repoState',
  defaults: { repoName: '', repoOwner: '' } as RepoStateModel,
})
@Injectable()
export class RepoState {
  @Selector()
  static selectedRepo(state: RepoStateModel): RepoStateModel {
    return state;
  }

  @Selector()
  static isRepoSelected(state: RepoStateModel): boolean {
    return state.repoName.length > 0;
  }

  @Action(SelectRepo)
  selectRepo(ctx: StateContext<RepoStateModel>, action: SelectRepo) {
    ctx.patchState({
      repoName: action.repoName,
      repoOwner: action.repoOwner,
    });
  }
}
