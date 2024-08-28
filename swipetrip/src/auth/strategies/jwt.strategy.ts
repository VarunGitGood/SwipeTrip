import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(private userService: UserService) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user: User = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      return null;
    }
    return { email: payload.email };
  }
}
