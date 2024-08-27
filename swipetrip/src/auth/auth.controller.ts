import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('test')
  async test() {
    return process.env.JWT_SECRET;
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('REQ', req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwtToken = req.user.jwt;
    console.log('USER', req.user);
    res.cookie('token', jwtToken);
    return res.status(200).redirect(process.env.CLIENT_URL);
  }
}
