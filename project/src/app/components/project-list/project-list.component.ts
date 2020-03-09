import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DummyProjectService} from '../../services/impl/dummy-project.service';
import {ProjectModel} from '../../model/project.model';
import {Routes} from '@angular/router';
import {ProjectViewModel} from '../../model/project-view.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, DoCheck {

  constructor(public dummyProjectService: DummyProjectService) {
  }

  ngOnInit(): void {
  }

  dataSource:ProjectViewModel[] = this.dummyProjectService.getProjects();
  displayedColumns: string[] = [ 'name','444444'];

  ngDoCheck(): void {
      this.dataSource = this.dummyProjectService.getProjects();
    // displayedColumns: string[] = [ 'name','444444'];

  }



}
