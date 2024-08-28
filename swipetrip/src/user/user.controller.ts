import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GeminiService } from '../gemini/gemini.service';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private geminiService: GeminiService,
  ) {}

  @Get('test')
  async test(@Req() rq, @Res() rs) {
    rs.json(rq.user);
  }

  @Patch()
  async updateUser(@Req() rq, @Res() rs, @Body() body) {
    const user = await this.userService.updateUser(rq.user.email, body);
    rs.json(user);
  }

  @Get()
  async generateItinary(@Req() rq, @Res() rs) {
    const user: User = await this.userService.findOneByEmail(rq.user.email);
    const itinary = await this.geminiService.generateText(
      JSON.stringify(user.preferences),
    );
    rs.json(itinary);
  }
}
