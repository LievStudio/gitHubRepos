export interface RepoModel {
  __typeName: string;
  name: string;
  description: string;
  owner: {
    login: string;
  };
}
