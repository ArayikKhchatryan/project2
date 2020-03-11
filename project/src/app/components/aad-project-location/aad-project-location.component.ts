import { Component, OnInit } from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any;

  districts:any;

  constructor(private cs: ClassifierServiceService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.counties = this.cs.getCountyClassifier();
  }

  getDistrictByParentId(id: number){
    this.districts = this.cs.getDistrictByParentId(id);
  }


  locationsForm = this.fb.group({
    county: [],
    district: [],
    percent: [],
  });


}
