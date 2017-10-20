export class News {
    title : string ;
    titlear: string;
    id:number;
    body:string;
    bodyar:string;
    date:Date;
    img_path:string;
    media_path: string ;

constructor (
              title:         string,
              titlear: string,
              body:    string,
              bodyar: string,
              date:    Date,
             )  {
                this.title       = title
                this.titlear = titlear
                this.body  = body
                this.bodyar = bodyar
              this.date = date
              }}
