import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

@Module({
  imports: [],
  providers: [GeminiService],
  controllers: [GeminiController],
})
export class GeminiModule {}
