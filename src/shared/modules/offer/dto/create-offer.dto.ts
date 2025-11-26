import { City, PropertyType, PropertyFeature } from '../../../types/index.js';
import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../../user/index.js';

export class CreateOfferDTO {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewImage!: string;
  public propertyPhotos!: Array<string>;
  public premiumFlag!: boolean;
  // favorite_flag!: '';
  public rating!: number;
  public propertyType!: PropertyType;
  public roomsNumber!: number;
  public guestsNumber!: number;
  public rentalCost!: number;
  public features!: Array<PropertyFeature>;
  public userId!: Ref<UserEntity>;
  public coordinates!: [number, number];
}
