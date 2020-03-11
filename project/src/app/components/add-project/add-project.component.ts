import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectModel} from '../../model/project.model';
import {DummyProjectService} from '../../services/impl/dummy-project.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {SectorModel} from '../../model/sector.model';
import {ErrorMethod} from '../util/errorMethod';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  // constructor(private projectService: ProjectService) {
  // let id: number = 4; //todo vercnel rootingic
  // }

  id: number;

  project: ProjectModel;

  form1;

  imp_statuses = this.cs.getImpStatusClassifier();

  sectors: any;

  sectorsArr: SectorModel[] = [];

  onSubmit() {
    console.log(this.form1.value);
  }

  constructor(private route: ActivatedRoute, private dummyProjectService: DummyProjectService, private cs: ClassifierServiceService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.sectors = this.cs.getSectorsClassifier();
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id < 0) {
      this.project = new ProjectModel("", null, null, 0, null, null,
        []);
    } else if (this.dummyProjectService.getProjectById(this.id)) {
      this.dummyProjectService.getProjectById(this.id).subscribe(res => {
        this.project = res;
      }, ErrorMethod.getError);
    } else {
      alert('Id incorrect');
    }


    this.form1 = new FormGroup({
      // projectCode: new FormControl('', [Validators.required, Validators.nullValidator({})]),
      projectCode: new FormControl(this.project.projectCode, [Validators.required]),
      projectTitle: new FormControl(this.project.projectTitle, Validators.required),
      description: new FormControl(this.project.description),
      implementationStatus: new FormControl(this.project.impStatusId, [Validators.required, Validators.min(1)]),
      startDate: new FormControl(this.project.startDate, Validators.required),
      endDate: new FormControl(this.project.endDate),



      // sectors:  this.fb.group({
      //   percent: new FormControl(),
      //   sector: new FormControl(this.project.sectors),
      // })


      // ectorsForm: this.fb.group({
      //   percent: [''],
      //   sector: [undefined],
      // }),
    });
  }

  sectorsForm = this.fb.group({
    percent: [],
    sector: [],
  });

  displayedColumns: string[] = ['name', '444444'];

  sectorsAdd() {
    this.sectorsForm.value.sectorName = this.cs.getSectorName(this.sectorsForm.value.sector);
    if (this.sectorsForm.value.sector && this.sectorsForm.value.percent) {
      this.sectorsArr.push(this.sectorsForm.value);
    }
    console.log(this.sectorsForm.value);
    console.log(this.sectorsArr);
  }
}


interface Sectors {
  sectorId?: string;
  percent?: number;
  sectorName?: string;
}

