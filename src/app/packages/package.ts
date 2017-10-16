export class Package {
  package_name: string;
  id: number;
  imgpath: string;
  points: number;
  // listedcustomers: string [];
  vouchers: string [];

  constructor(package_name: string, points: number, id: number, vouchers: string []) {
    this.package_name = package_name;
    this.points = points;
    this.id = id;
    this.vouchers = vouchers;
  }
}
