import { City } from './city.enum.js';
import { PropertyType } from './propertyType.enum.js';
import { PropertyFeature } from './propertyFeature.enum.js';
import { User } from './user.js';

type BaseOffer = {
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
  coordinates: [number, number];
};

export type MockOffer = BaseOffer & {
  user: User;
};
export type Offer = BaseOffer & {
  userId: string;
};
