import { LoginUserDto, UserEntity } from '../user/index.js';

export interface AuthService {
  issueToken(user: UserEntity): Promise<string>;
  authenticate(dto: LoginUserDto): Promise<UserEntity>;
}
