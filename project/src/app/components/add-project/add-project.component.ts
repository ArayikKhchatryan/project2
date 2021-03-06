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
import {ClassifiersModel} from '../../model/classifiers.model';


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

  imp_statuses: ClassifiersModel[];

  sectors: any;

  sectorsArr: SectorModel[] = [];

  locationsArr: LocationModel[] = [];

  duration: number = null;

  onSubmit() {
    console.log(this.form1.value);
  }

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private cs: ClassifierServiceService, private fb: FormBuilder, public dialog: MatDialog) {

  }

  addForm() {
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
  }

  isReady: Boolean = false;

  ngOnInit(): void {
    // this.projectService.getLocations().subscribe(res => {
    //   this.locationsArr = res;
    // });

    this.cs.getSectorsClassifier().subscribe((res) => {
      this.sectors = res;
    });

    this.cs.getImpStatusClassifier().subscribe(res => {
      this.imp_statuses = res;
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id < 0) {
      this.project = new ProjectModel();
      this.addForm();
      this.isReady = true;
    } else {
      this.projectService?.getProjectById(this.id)?.subscribe(res => {
        // alert('Id incorrect');
        this.project = res;
        this.sectorsArr = this.project.sectors;
        this.locationsArr = this.project.locations;
        console.log(this.project.sectors);

        this.addForm();
        this.isReady = true;

        this.getDate();
      }, ErrorMethod.getError);
    }
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

  getSectorName(sectorId: number) {
    return this.cs.getSectorName(sectorId);
  }

  getCountyNameById(countyId: number) {
    return this.cs.getCountyNameById(countyId);
  }

  getDistrictNameById(districtId: number, parentId: number) {
    return this.cs.getDistrictNameById(districtId, parentId);
  }

  displayedColumns: string[] = ['name', '444444'];

  deleteSector(id) {

  }

  countyId: string;
  percent: number;
  districtId: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(AadProjectLocationComponent, {
      width: '400px',
      data: {countyId: this.countyId, districtId: this.districtId, percent: this.percent}
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert(result);
      this.locationsArr.push(result);
      console.log('-----------------------');
      console.log(this.locationsArr);
    });
    // dialogRef.disableClose = true;
  }


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
    this.project = new ProjectModel(obj.projectCode, obj.projectTitle, obj.description, obj.implementationStatus, obj.startDate, obj.endDate, this.sectorsArr, this.locationsArr);

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

