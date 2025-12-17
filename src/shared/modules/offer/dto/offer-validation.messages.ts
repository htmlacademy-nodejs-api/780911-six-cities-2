import { City, PropertyFeature, PropertyType } from '../../../types/index.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: `type must one of next values ${Object.values(City).join(', ')}`,
  },
  previewImage: {
    extension: 'Format should be either *.jpg or *.png',
  },
  propertyPhotos: {
    invalidlength: 'Should contain 6 images',
  },
  premiumFlag: {
    type: 'Value must be boolean',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },

  propertyType: {
    invalid: `type must one of next values ${Object.values(PropertyType).join(
      ', '
    )}`,
  },
  roomsNumber: {
    invalidFormat: 'Rooms number must be an integer',
    minValue: 'Minimum rooms number is 1',
    maxValue: 'Maximum rooms number is 8',
  },
  guestsNumber: {
    invalidFormat: 'Guests number must be an integer',
    minValue: 'Minimum guests number is 1',
    maxValue: 'Maximum guests number is 10',
  },
  rentalCost: {
    invalidFormat: 'Price must be an number',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100 000',
  },

  features: {
    invalidFormat: 'Field features must be an array',
    invalidValue: `Categories field must be an array containing next values: ${Object.values(
      PropertyFeature
    ).join(', ')}`,
    minValue: 'There should be at least 1 item in an array',
    maxValue: `Max features number is ${Object.values(PropertyFeature).length}`,
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Field coordinates must be an array',
    invalidLength:
      'Coordinates array should have 2 items [latitude, longitude]',
    invalidArrayItemFormat: 'Should be an number',
  },
  commentsCount: {
    invalidFormat: 'Comments count number must be an integer',
  },
} as const;
