import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DummyProjectService} from '../../services/impl/dummy-project.service';
import {ProjectModel} from '../../model/project.model';
import {Routes} from '@angular/router';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable, of} from 'rxjs';
import {ErrorMethod} from '../util/errorMethod';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: ProjectViewModel[] = [];

  constructor(private dummyProjectService: DummyProjectService) {
  }

  ngOnInit(): void {
    this.dummyProjectService.getProjects().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
      console.log("aaaaaaaaaaaaaaaa");
    }, ErrorMethod.getError);
    // alert(this.dummyProjectService.projectViewList);


    // this.dummyProjectService.getProjectViewList();

  }

  displayedColumns: string[] = ['name', '444444'];

  deleteProject(id) {
    this.dummyProjectService.deleteProjectById(id).subscribe(res => {
      console.log(res);
      if(res.status){
         this.ngOnInit();
       }
       else {
         alert("can not delete")
       }
     });
    // displayedColumns: string[] = [ 'name','444444'];
  }


}
