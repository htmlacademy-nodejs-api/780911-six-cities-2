import { City } from './city.enum.js';
import { PropertyFeature } from './propertyFeature.enum.js';
import { PropertyType } from './propertyType.enum.js';

export type MockServerData = {
  descriptions: Array<string>;
  titles: Array<string>;
  cities: Array<City>;
  preview_images: Array<string>;
  property_photos: Array<Array<string>>;
  property_types: Array<PropertyType>;
  features: Array<PropertyFeature>;
  usersIds: Array<string>;
  coordinates: { [C in City]: [number, number][] };
};
