export class ProjectViewModel {
  id: number;
  projectTitle: string;

  constructor(_id: number, _name: string) {
    this.id = _id;
    this.projectTitle = _name;
  }
}
