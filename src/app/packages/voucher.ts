export class Voucher {
  title: string;
  id: number;
  description: string;
  exp_date: string;
  points: number;
  condition: string;
  package_id: number;

  constructor(title: string, id: number, description: string, exp_date: string, points: number, condition: string, package_id: number) {
    this.title = title;
    this.id = id;
    this.description = description;
    this.exp_date = exp_date;
    this.points = points;
    this.condition = condition;
    this.package_id = package_id;
  }
}
