import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private geminiService: GeminiService) {}
  @Post('generate')
  async generate(@Req() req, @Res() res, @Body() body) {
    return this.geminiService.generateText(body.data);
  }
}
