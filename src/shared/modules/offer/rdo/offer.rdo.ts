import { Expose, Transform } from 'class-transformer';
/* eslint-disable indent */
export class OfferRdo {
  @Expose()
  public _id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public propertyPhotos!: Array<string>;

  @Expose()
  public premiumFlag!: boolean;

  // favorite_flag!: '';
  @Expose()
  public rating!: number;

  @Expose()
  public propertyType!: string;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public guestsNumber!: number;

  @Expose()
  public rentalCost!: number;

  @Expose()
  public features!: Array<string>;

  @Expose()
  public coordinates!: [number, number];

  @Expose()
  public commentCount!: number;

  @Expose()
  public userId!: string;

  @Transform(({ value }) => ({
    _id: value._id,
    image: value.image,
    name: value.name,
  }))
  public user!: { _id: string; name: string; image: string };
}
