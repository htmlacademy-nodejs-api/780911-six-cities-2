import { MockUser } from './user.js';

type BaseComment = {
  text: string;
  publicationDate: Date;
  rating: number;
};

export type MockComment = BaseComment & {
  user: MockUser;
};

export type Comment = BaseComment & {
  userId: string;
};
