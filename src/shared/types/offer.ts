import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../modules/user/index.js';

import { City } from './city.enum.js';
import { PropertyType } from './propertyType.enum.js';
import { PropertyFeature } from './propertyFeature.enum.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  propertyPhotos: Array<string>;
  premiumFlag: boolean;
  // favorite_flag: '';
  rating: number;
  propertyType: PropertyType;
  roomsNumber: number;
  guestsNumber: number;
  rentalCost: number;
  features: Array<PropertyFeature>;
  userId: Ref<UserEntity>;
  coordinates: [number, number];
};
