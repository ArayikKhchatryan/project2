import {ProjectService} from '../project.service';
import {ProjectModel} from '../../model/project.model';
import {SectorModel} from '../../model/sector.model';
import {Injectable} from '@angular/core';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable, of} from 'rxjs';
import {Response} from '../project.service';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class DummyProjectService extends ProjectService {
  projectList: ProjectModel[] = [new ProjectModel('00project code', '00project title', 'description', 1, new Date(), new Date(),
    [new SectorModel(1, '1', 15)]),
    new ProjectModel('111', '111project title 2000', 'description 22', 2, new Date(), new Date(),
      [new SectorModel(2, '2', 51)]),
    new ProjectModel('2222project code 22', '222project title 22', 'description 22', 2, new Date(), new Date(),
      [new SectorModel(2, '3', 51)]),
    new ProjectModel('333333project code 22', '333project title 22', 'description 22', 2, new Date(), new Date(),
      [new SectorModel(2, '4', 51)]),
    new ProjectModel('44444project code 22', '444project title 22', 'description 22', 2, new Date(), new Date(),
      [new SectorModel(2, '5', 51)]),
    new ProjectModel('5555project code 22', '555project title 22', 'description 22', 2, new Date(), new Date(),
      [new SectorModel(2, '6', 51)])];

  projectViewList: ProjectViewModel[] = [];
  // [new ProjectViewModel(1, 'title1'), new ProjectViewModel(2, 'title2'), new ProjectViewModel(1, 'title3'),
  // new ProjectViewModel(2, 'title4'),new ProjectViewModel(1, 'title5'),
  // new ProjectViewModel(2, 'title6'),new ProjectViewModel(1, 'title7'), new ProjectViewModel(2, 'title8'), ];

  getProjectViewList() {
    this.projectViewList = [];
    for (let project of this.projectList) {
      this.projectViewList.push(new ProjectViewModel(project.id, project.projectTitle));
    }
  }

  getProjectById(id: number): Observable<ProjectModel> {
    for (let project of this.projectList) {
      if (id == project.id) {
        return of(project);
      }
    }
    return undefined;
  }

  getProjects(): Observable<ProjectViewModel[]> {
    return of(this.projectViewList);
  }

  addProject(project: ProjectModel): Observable<Response> {
    this.projectList.push(project);
    return of(new Response(true));
  }

  deleteProjectById(id: number): Observable<Response> {
    // console.log(id);

    let index: number = this.projectList.indexOf(this.getProjectById(id));
    if (index >= 0) {
      alert(index);
      // console.log(index + "saaaaaa");
      this.projectList.splice(index, 1);
      // console.log(id)
      console.log(this.projectList);
      return of(new Response(true));
    } else {
      alert(false);
      return of(new Response(false));
    }
  }

  updateProject(project: ProjectModel): Observable<Response> {
    return of(new Response(true));
  }
}
