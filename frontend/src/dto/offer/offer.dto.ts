import { City, PropertyType, PropertyFeature, BaseOfferDTO } from './types';
import { APIUserType } from '../user/user-type';
export class OfferDto extends BaseOfferDTO {
  user!: {
    _id: string;
    name: string;
    userType: APIUserType;
  };

  id!: string;
}
