import {SectorModel} from './sector.model';

export class ProjectModel {
  static _id: number = 0;
  id: number = 0;


  constructor(public projectCode:string, public  projectTitle: string, public description: string, public impStatusId: number,
              public startDate: Date, public endDate: Date, public sectors: SectorModel[]) {
    this.id += ProjectModel._id ++;
  }
}
