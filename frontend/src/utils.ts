import { MAX_PERCENT_STARS_WIDTH, STARS_COUNT, UserType } from './const';
import CreateUserDto from './dto/user/create-user.dto';
import { APIUserType } from './dto/user/user-type';
import { UserRegister, User } from './types/types';

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(date)
  );

export const getStarsWidth = (rating: number) =>
  `${(MAX_PERCENT_STARS_WIDTH * Math.round(rating)) / STARS_COUNT}%`;

export const getRandomElement = <T>(array: readonly T[]): T =>
  array[Math.floor(Math.random() * array.length)];
export const pluralize = (str: string, count: number) =>
  count === 1 ? str : `${str}s`;
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export class Token {
  private static _name = 'six-cities-auth-token';

  static get() {
    const token = localStorage.getItem(this._name);

    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(this._name, token);
  }

  static drop() {
    localStorage.removeItem(this._name);
  }
}

export const adaptRegisterUserToApi = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  password: user.password,
  userType: user.type === UserType.Pro ? APIUserType.Pro : APIUserType.Starter,
  favorites: [],
});
