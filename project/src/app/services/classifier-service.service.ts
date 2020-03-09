import {Injectable} from '@angular/core';
import {ClassifiersModel} from '../model/classifiers.model';

@Injectable({
  providedIn: 'root'
})
export class ClassifierServiceService {

  constructor() {
  }

  implementation_Status: ClassifiersModel[] = [new ClassifiersModel(1, 'Planned'), new ClassifiersModel(2, 'Pipelined'), new ClassifiersModel(3, 'Ongoing')
    , new ClassifiersModel(4, 'Stalled'), new ClassifiersModel(5, 'Extended'), new ClassifiersModel(6, 'Terminated')
    , new ClassifiersModel(7, 'Suspended'), new ClassifiersModel(8, 'Compladed')];


  sectors_classifier: ClassifiersModel[] = [new ClassifiersModel(1, 'Health'), new ClassifiersModel(2, 'Agriculture')
    , new ClassifiersModel(3, 'Economy'), new ClassifiersModel(4, 'Administrative')];


  getClassifier(classifierName: string) {
    switch (classifierName) {
      case '1':
        return this.implementation_Status;
      case '2':
        return this.sectors_classifier;
    }
  }

  getImpStatusClassifier(){
    return this.implementation_Status;
  }

  getSectorsClassifier(){
    return this.sectors_classifier;
  }

  getSectorName(_id): string{
    for(let obj of this.sectors_classifier){
      if(obj.id == _id){
        return obj.name;
      }
    }
  }

}
