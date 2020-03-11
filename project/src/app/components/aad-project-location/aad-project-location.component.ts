import { Component, OnInit } from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any;

  district:any;

  constructor(private cs: ClassifierServiceService) { }

  ngOnInit(): void {
    this.counties = this.cs.getCountyClassifier();
  }

  getDistrictByParentId(id: number){
    this.district = this.cs.getDistrictByParentId(id);
  }

}
