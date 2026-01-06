import { APIUserType } from './user-type';

export default class CreateUserDto {
  public name!: string;

  public email!: string;

  public avatar?: File;

  public password!: string;

  public userType!: APIUserType;

  public favorites!: string[];
}
