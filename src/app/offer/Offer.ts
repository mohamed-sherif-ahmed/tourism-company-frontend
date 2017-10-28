export class Offer {
name: string;
description: string;
desar:string;
exp_date: Date;
creationDate:Date;
given_points: number ;
img_path: string ;
type: string ;
conditionar:string;
titlear:string;
condition: string;
price: number;
constructor (
              name:         string,
              namear:string,
              description:    string,
              descriptionar:string ,
              exp_date:    Date,
              creationDate:Date,
              img_path:    string,
              type:        string,
              condition:       string,
              conditionar : string,
              price:number
             )  {
                this.name       = name
                this.description   = description
                this.exp_date  = exp_date
                this.creationDate=creationDate
                this.img_path      = img_path
                this.type  = type
                this.condition   = condition
                this.conditionar = conditionar
                this.titlear= namear
                this.desar=descriptionar
                this.price = price

              }

}
