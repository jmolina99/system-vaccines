export interface Employee {
  _id?: string;
  dni: string;
  names: string;
  last_names: string;
  email: string;
  birthday?: string;
  address?: string;
  phone?: string;
  status_vaccine?: boolean;
  type_vaccine?: string;
  date_vaccine?: string;
  doses_vaccine?: number;
  status_employee?: boolean;
}
