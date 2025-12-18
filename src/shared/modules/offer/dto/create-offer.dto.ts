import {
  MaxLength,
  MinLength,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsNumber,
  IsMongoId,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { City, PropertyType, PropertyFeature } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './offer-validation.messages.js';

export class CreateOfferDTO {
  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @IsString({ message: CreateOfferValidationMessage.description.invalidFormat })
  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description!: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.publicationDate.invalidFormat }
  )
  public publicationDate!: Date;

  @IsEnum(City, {
    message: CreateOfferValidationMessage.city.invalid,
  })
  public city!: City;

  // TODO: check after adding multer

  public previewImage!: string;
  // TODO: check after adding multer
  @IsArray()
  @ArrayMinSize(6, {
    message: CreateOfferValidationMessage.propertyPhotos.invalidlength,
  })
  @ArrayMaxSize(6, {
    message: CreateOfferValidationMessage.propertyPhotos.invalidlength,
  })
  public propertyPhotos!: Array<string>;

  @IsBoolean({ message: CreateOfferValidationMessage.premiumFlag.type })
  public premiumFlag!: boolean;

  // favorite_flag!: '';
  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 1 },
    { message: CreateOfferValidationMessage.rating.invalidFormat }
  )
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating!: number;

  @IsEnum(PropertyType, {
    message: CreateOfferValidationMessage.propertyType.invalid,
  })
  public propertyType!: PropertyType;

  @Type(() => Number)
  @IsInt({ message: CreateOfferValidationMessage.roomsNumber.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsNumber.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsNumber.maxValue })
  public roomsNumber!: number;

  @Type(() => Number)
  @IsInt({ message: CreateOfferValidationMessage.guestsNumber.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsNumber.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsNumber.maxValue })
  public guestsNumber!: number;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: CreateOfferValidationMessage.rentalCost.invalidFormat }
  )
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.maxValue })
  public rentalCost!: number;

  @IsArray({ message: CreateOfferValidationMessage.features.invalidFormat })
  @ArrayMinSize(1, {
    message: CreateOfferValidationMessage.features.minValue,
  })
  @ArrayMaxSize(Object.values(PropertyFeature).length, {
    message: CreateOfferValidationMessage.features.maxValue,
  })
  @IsEnum(PropertyFeature, {
    each: true,
    message: CreateOfferValidationMessage.features.invalidValue,
  })
  public features!: Array<PropertyFeature>;

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId!: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : value))
  @IsArray({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  @ArrayMinSize(2, {
    message: CreateOfferValidationMessage.coordinates.invalidLength,
  })
  @ArrayMaxSize(2, {
    message: CreateOfferValidationMessage.coordinates.invalidLength,
  })
  @IsNumber(
    {},
    {
      each: true,
      message: CreateOfferValidationMessage.coordinates.invalidArrayItemFormat,
    }
  )
  public coordinates!: [number, number];

  @Type(() => Number)
  @IsInt({ message: CreateOfferValidationMessage.commentsCount.invalidFormat })
  public commentsCount!: number;
}

// try to use objectId
// create own custom id and use it everywhere or create cust id helper to work with id from mongoose, mongoose has own helpers to solve this issue
