import { Roles } from './roles';

export class Users {
  id: any;
  email: any;
  enabled: any;
  first_name: any;
  last_name: any;
  password: any;
  phone: any;
  // roles: Roles[];
  constructor(private roles: Roles[]) {}
}
