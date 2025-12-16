import { UserType } from '../../../types/index.js';

export class CreateUserDTO {
  public name!: string;
  public email!: string;
  public image!: string;
  public password!: string;
  public userType!: UserType;
}
