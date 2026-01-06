import { City, PropertyType, PropertyFeature } from './types';
export default class CreateOfferDto {
  id!: string;
  title!: string;
  description!: string;
  publicationDate!: Date;
  city!: City;
  previewImage!: File;
  propertyPhotos!: File[];
  premiumFlag!: boolean;
  rating!: number;
  propertyType!: PropertyType;
  roomsNumber!: number;
  guestsNumber!: number;
  rentalCost!: number;
  features!: PropertyFeature[];
  userId!: string;
  coordinates!: [number, number];
}
