import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { LikeService } from './like.service';

@Module({
  imports: [UserModule],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
