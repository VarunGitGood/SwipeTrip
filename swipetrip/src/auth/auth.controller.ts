import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@UseGuards(AuthGuard('google'))
@Controller('auth')
export class AuthController {
  @Get('test')
  async test() {
    return process.env.JWT_SECRET;
  }
  @Get('google')
  async googleAuth(@Req() req) {
    console.log('REQ', req);
  }

  @Get('google/callback')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwtToken = req.user.jwt;
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    return res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
}
