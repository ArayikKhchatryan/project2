import {ProjectService} from '../project.service';
import {ProjectModel} from '../../model/project.model';
import {ProjectViewModel} from '../../model/project-view.model';

export class HttpProjectService extends ProjectService{
  getProjectById(id: number): ProjectModel {
    return undefined;
  }


  addProject(project: ProjectModel): boolean {
    return false;
  }

  deleteProjectById(id: number): boolean {
    return false;
  }

  updateProject(project: ProjectModel) {
  }

  getProjects(): ProjectViewModel[] {
    return [];
  }

  // getProjects(): ProjectModel[] {
  //   return null;
  // }

}
