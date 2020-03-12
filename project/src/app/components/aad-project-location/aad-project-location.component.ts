import {Component, OnInit} from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {FormBuilder} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {LocationModel} from '../../model/location.model';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any;

  districts: any;

  constructor(private cs: ClassifierServiceService, private fb: FormBuilder, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.counties = this.cs.getCountyClassifier();
  }

  getDistrictByParentId(id: number) {
    this.districts = this.cs.getDistrictByParentId(id);
  }


  locationsForm = this.fb.group({
    county: [],
    district: [],
    percent: [],
  });

  addLocation() {
    if (this.locationsForm.value.county && this.locationsForm.value.district) {
      let obj = this.locationsForm.value;
      let newLocation = new LocationModel(obj.county, obj.district, obj.percent);
      this.projectService.addLocation(newLocation);
      // alert(obj.percent);
      // console.log(newLocation);
      // console.log(obj.percent);
      console.log(this.projectService.getLocations());
    }
  }

}
