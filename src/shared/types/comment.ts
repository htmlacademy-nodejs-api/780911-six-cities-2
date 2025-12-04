import { MockUser } from './user.js';

type BaseComment = {
  text: string;
  publicationDate: Date;
  rating: number;
  offerId: string; // Should it be ref to Offer id?
};

export type MockComment = BaseComment & {
  user: MockUser;
};

export type Comment = BaseComment & {
  userId: string;
};

//TODO: there is base type and 2 inhereted types with difference regards ref types.
// How to handle it more correct way?
// Should I use only 1 type?
