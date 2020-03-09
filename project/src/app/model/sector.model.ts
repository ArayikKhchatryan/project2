export class SectorModel {
  id: number;
  sectorName: string;
  sectorPercent: number;

  constructor(_id?:number, _sectorName?: string, _sectorPercent?: number) {
    if(_id){
      this.id = _id;
      this.sectorName = _sectorName;
    }
    if(_sectorPercent){
      this.sectorPercent = _sectorPercent;
    }
  }
}
