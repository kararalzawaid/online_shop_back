import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenDto } from '@users/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async generateJwt(user: any): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async decode(token: TokenDto): Promise<any> {
    return this.jwtService.decode(token.token);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
