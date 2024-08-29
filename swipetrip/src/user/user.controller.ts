import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GeminiService } from '../gemini/gemini.service';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('JWT'))
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private geminiService: GeminiService,
  ) {}

  @Get('test')
  async test(@Req() rq, @Res() rs) {
    if (rq.user) {
      rs.json(rq.user);
      return;
    }
    return rs.status(401).send('Unauthorized');
  }

  @Get()
  async getUser(@Req() rq, @Res() rs) {
    const user = await this.userService.findOneByEmail(rq.user.email);
    rs.json(user);
  }

  @Patch()
  async updateUser(@Req() rq, @Res() rs, @Body() body) {
    const user = await this.userService.updateUser(rq.user.email, body);
    rs.json(user);
  }

  @Post('itinary')
  async generateItinerary(@Req() rq, @Res() rs, @Body() body) {
    const { preferences } = body;
    const user: User = await this.userService.findOneByEmail(rq.user.email);
    const userPreferencesString = JSON.stringify(user.preferences);
    const bodyPreferencesString = JSON.stringify(preferences);
    const combinedPreferencesString = `${userPreferencesString}_${bodyPreferencesString}`;
    const itinerary = await this.geminiService.generateText(
      combinedPreferencesString,
    );
    rs.json(itinerary);
  }
}
