import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //   @Get()
  //   async test() {
  //     return process.env.MONGO_URI;
  //   }
}
