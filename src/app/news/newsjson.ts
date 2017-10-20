export class newsjson{

  title: [
            {
              lang: {
                type: String,
                required: true
              },
              value:{
                type: String,
                required: true
              }
            }
       ];
       body: [
            {
                lang: {
                    type: String,
                    required: true
                },
                value:{
                    type: String,
                    required: true
                }
            }
       ];
        date: {
            type: Date
        };
        img_path: {
            type: String
        };
        media_path: {
            type: String
        };
}
