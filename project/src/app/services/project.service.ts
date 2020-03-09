import {ProjectModel} from '../model/project.model';
import {Injectable} from '@angular/core';
import {ProjectViewModel} from '../model/project-view.model';

@Injectable()
export abstract class ProjectService {
  abstract getProjectById(id: number): ProjectModel;  //TODO Ovser

  // abstract getProjects(): ProjectModel[];

  abstract getProjects(): ProjectViewModel[];

  abstract addProject(project: ProjectModel): boolean;

  abstract deleteProjectById(id: number): boolean ;

  abstract updateProject(project: ProjectModel);
}

