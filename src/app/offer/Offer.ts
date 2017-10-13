export class Offer {
name: string;
description: string;
desar:string;
exp_date: string;
given_points: number ;
img_path: string ;
type: string ;
conditionar:string;
titlear:string;
condition: string;
constructor (
              name:         string,
              namear:string,
              description:    string,
              descriptionar:string ,
              exp_date:    string,
              given_points:    number,
              img_path:    string,
              type:        string,
              condition:       string,
              conditionar : string,
             )  {
                this.name       = name
                this.description   = description
                this.exp_date  = exp_date
                this.given_points  = given_points
                this.img_path      = img_path
                this.type  = type
                this.condition   = condition
                this.conditionar = conditionar
                this.titlear= namear
                this.desar=descriptionar

              }

}
