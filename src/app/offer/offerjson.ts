export class offerjson {
	name: [
		{
			lang: "ar",
			value: string
		},
		{
			lang: "en",
			value: string
		}
	];
	description: [
		{
			lang: "ar",
			value: string
		},
		{
			lang: "en",
			value:string
		}
	];
	exp_date: Date;
	creation_date: Date ;
	_id:string;
	condition_type: boolean;
	condition: [
		{
			lang: "ar",
			value: string
		},
		{
			lang: "en",
			value: string
		}
	];
	is_voucher: boolean;
img_path:string ;
price:number;
editingNow:boolean;

}
