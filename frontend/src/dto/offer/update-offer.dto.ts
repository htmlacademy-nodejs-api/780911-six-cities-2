import { City, PropertyType, PropertyFeature } from './types';
export class UpdateOfferDto {
  title!: string;
  description!: string;
  publicationDate!: Date;
  city!: City;
  previewImage!: File;
  propertyPhotos!: File[];
  premiumFlag!: boolean;
  propertyType!: PropertyType;
  roomsNumber!: number;
  guestsNumber!: number;
  rentalCost!: number;
  features!: PropertyFeature[];
  userId!: string;
  coordinates!: [number, number];
}
