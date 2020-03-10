import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DummyProjectService} from '../../services/impl/dummy-project.service';
import {ProjectModel} from '../../model/project.model';
import {Routes} from '@angular/router';
import {ProjectViewModel} from '../../model/project-view.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {

  constructor(private dummyProjectService: DummyProjectService) {
  }

  ngOnInit(): void {
    this.dataSource = this.dummyProjectService.getProjects();
    // alert(this.dummyProjectService.projectViewList);
    this.dummyProjectService.getProjectViewList();
  }

  dataSource:ProjectViewModel[] = this.dummyProjectService.getProjects();
  displayedColumns: string[] = [ 'name','444444'];

  ngDoCheck(): void {
    this.dataSource = this.dummyProjectService.getProjects();
    // displayedColumns: string[] = [ 'name','444444'];
    this.dummyProjectService.getProjectViewList()
  }

  deleteProject(id){
    this.dummyProjectService.deleteProjectById(id);
    this.dataSource = this.dummyProjectService.getProjects();
    // displayedColumns: string[] = [ 'name','444444'];
    this.dummyProjectService.getProjectViewList()
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewChecked(): void {
  }



}
