import { APIUserType } from './user-type';

export default class UserDto {
  public name!: string;

  public email!: string;

  public avatar?: string;

  public password!: string;

  public userType!: APIUserType;

  public favorites?: string[];
}
