export class Offer {
name: string;
description: string;
exp_date: string;
given_points: number ;
img_path: string ;
type: string ;
condition_type: string;
condition: string;
constructor (
              name:         string,
              description:    string,
              exp_date:    string,
              given_points:    number,
              img_path:    string,
              type:        string,
              condition_type:     string,
              condition:       string,
             )  {
                this.name       = name
                this.description   = description
                this.exp_date  = exp_date
                this.given_points  = given_points
                this.img_path      = img_path
                this.type  = type
                this.condition_type      = condition_type
                this.condition   = condition

              }

}
