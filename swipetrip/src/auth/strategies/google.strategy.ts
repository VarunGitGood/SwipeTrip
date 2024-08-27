import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;

    let user = await this.usersService.findOneByEmail(email);
    if (!user) {
      user = await this.usersService.create({
        email,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
      });
    }

    const jwt = await this.authService.generateJwtToken(user);
    done(null, { user, jwt });
  }
}
