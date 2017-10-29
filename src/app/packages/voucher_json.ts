export class voucher_json {
    'name': [
      {
        'lang': 'en',
        'value': string
      },
      {
        'lang': 'ar',
        'value': string
      }
    ];
    'description':[
      {
        'lang': 'en',
        'value': string
      },
      {
        'lang': 'ar',
        'value': string
      }
    ];
    'creation_date': Date;
    'exp_date': Date;
    'is_voucher': boolean;
    'given_points': number;
    'condition':[
      {
        'lang': 'en',
        'value': string
      },
      {
        'lang': 'ar',
        'value': string
      }
    ];
    'condition_type': boolean;
    '_id': string;
  };