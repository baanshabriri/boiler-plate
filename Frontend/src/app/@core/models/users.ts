export interface User {
  id:string;
  email:string;
  first_name:string;
  last_name: string;
  picture: any[];
  password: string;
  devices: Device[];
  roles: Role;
  mobile_number: string;
  categories: Category[];
  role_id: number;
  device_limit: number;

  //branches: any[];
  //address: Address;
  //field1: string;
  //outlets: any[];
  //statuses: Status[];
  //user_type_id: number;
  //is_premium: boolean;
  //brand_id: number;
  //brand: Brand;
  //vehicle_detail?: VehicleDetail;
  //on_boarding_detail?: OnBoardingDetail;
  //partner?:Partner; 
}

export interface Device {
    id:string;
    name:string;
  }


export interface Role {
  id: number;
  name: string;
  external_identity: string;
  level: number;
}

export interface Category {
  id: number;
  name: string;
  type: string;
}

