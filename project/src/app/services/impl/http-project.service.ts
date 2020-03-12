import {ProjectService} from '../project.service';
import {ProjectModel} from '../../model/project.model';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable} from 'rxjs';
import {Response} from '../project.service';

export class HttpProjectService extends ProjectService{
  addProject(project: ProjectModel): Observable<Response> {
    return undefined;
  }

  deleteProjectById(id: number): Observable<Response> {
    return undefined;
  }

  getProjectById(id: number): Observable<ProjectModel> {
    return undefined;
  }


  updateProject(project: ProjectModel): Observable<Response> {
    return undefined;
  }

  getProjects(): Observable<ProjectViewModel[]> {
    return undefined;
  }





}
