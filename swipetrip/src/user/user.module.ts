import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { GeminiModule } from '../gemini/gemini.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    GeminiModule,
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
