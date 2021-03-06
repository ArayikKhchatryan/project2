import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProjectModel} from '../../model/project.model';
import {Routes} from '@angular/router';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable, of} from 'rxjs';
import {ErrorMethod} from '../util/errorMethod';
import {ProjectService} from '../../services/project.service';
import {tryReadFile} from 'tslint/lib/files/reading';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: ProjectViewModel[];

  isReady: Boolean = false;

  constructor(private dummyProjectService: ProjectService) {
  }

  ngOnInit(): void {
    this.dummyProjectService.getProjects().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
      this.isReady = true;
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
