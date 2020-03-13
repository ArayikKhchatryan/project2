import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectModel} from '../../model/project.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {SectorModel} from '../../model/sector.model';
import {ErrorMethod} from '../util/errorMethod';
import {AadProjectLocationComponent} from '../aad-project-location/aad-project-location.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectService} from '../../services/project.service';
import {LocationModel} from '../../model/location.model';


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

  locationsArr: LocationModel[] = [];

  onSubmit() {
    console.log(this.form1.value);
  }

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private cs: ClassifierServiceService, private fb: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    // this.projectService.getLocations().subscribe(res => {
    //   this.locationsArr = res;
    // });

    this.sectors = this.cs.getSectorsClassifier();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id < 0) {
      this.project = new ProjectModel('', null, null, 0, null, null, []);
    } else  {
      this.projectService.getProjectById(this.id).subscribe(res => {
        alert('Id incorrect');
        this.project = res;
        this.sectorsArr = this.project.sectors;
        console.log(this.project.sectors);
      }, ErrorMethod.getError);
    }
      // else {
    //   alert('Id incorrect');
    // }


    this.form1 = new FormGroup({
      // projectCode: new FormControl('', [Validators.required, Validators.nullValidator({})]),
      projectCode: new FormControl(this.project.projectCode, [Validators.required]),
      projectTitle: new FormControl(this.project.projectTitle, Validators.required),
      description: new FormControl(this.project.description),
      implementationStatus: new FormControl(this.project.impStatusId, [Validators.required, Validators.min(1)]),
      startDate: new FormControl(this.project.startDate, Validators.required),
      endDate: new FormControl(this.project.endDate),
      duration: new FormControl(),

      // sectors:  this.fb.group({
      //   percent: new FormControl(),
      //   sector: new FormControl(this.project.sectors),
      // })


      // sectorsForm: this.fb.group({
      //   percent: [''],
      //   sector: [undefined],
      // }),
    });


    this.getDate();
  }

  sectorsForm = this.fb.group({
    percent: [],
    sector: [],
  });

  sectorsAdd() {
    this.sectorsForm.value.sectorName = this.sectorsForm.value.sector;
    if (this.sectorsForm.value.sector && this.sectorsForm.value.percent) {
      this.sectorsArr.push(this.sectorsForm.value);

      // this.sectorsForm.value.sector = 0;
      // this.sectorsForm.value.sector == [];
      // this.sectorsForm.value.percent == [];
    }
  }

  getSectorName(sectorId) {
    return this.cs.getSectorName(sectorId);
  }

  displayedColumns: string[] = ['name', '444444'];

  deleteSector(id) {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AadProjectLocationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.locationsArr.push(result);
    });
    dialogRef.disableClose = true;
  }

  duration: number = null;

  getDate() {
    let startDate = new Date(this.form1.value.startDate).getTime();
    let endDate = new Date(this.form1.value.endDate).getTime();
    if (this.form1.value.startDate && this.form1.value.endDate) {
      let tarb = endDate - startDate;
      let orTarb = tarb / (60 * 60 * 24 * 1000);
      this.form1.value.duration = Math.floor(orTarb);
      // alert(this.form1.value.duration);
      // this.form1.value.description = 'aa';
    } else if (this.form1.value.startDate && this.form1.value.duration) {

      // this.form1.value.endDate = this.form1.value.startDate + this.form1.value.duration;
      this.form1.value.endDate = new Date();
      // alert(this.form1.value.duration)
      this.form1.value.endDate.setDate(Number(this.form1.value.startDate.getDate()) + Number(this.form1.value.duration));
      // alert(this.form1.value.endDate);
    }
  }


  saveProject() {
    const obj = this.form1.value;
    this.project = new ProjectModel(obj.projectCode, obj.projectTitle, obj.description, obj.implementationStatus, obj.startDate, obj.endDate, this.sectorsArr);

    if (this.id < 0) {
      // console.log(this.project);
      // this.project  = this.form1.value;
      // // this.project.id = 2;
      // this.projectService.getProjects().subscribe(res => {
      //   console.log(res.length);
      //   this.project.id = res.length;
      // });
      // this.project.sectors = this.sectorsArr;
      this.projectService.addProject(this.project);

      // console.log("-------------------------------------------------------------------------");
      // console.log(this.projectService.getProjects() + "asasasasaaaaaaaaaaaaaaa");
      // console.log(this.project);
      // console.log("-------------------------------------------------------------------------");
    } else {
      this.project.id = this.id;
      this.projectService.updateProject(this.project);
    }
  }


}


interface Sectors {
  sectorId?: string;
  percent?: number;
  sectorName?: string;
}

