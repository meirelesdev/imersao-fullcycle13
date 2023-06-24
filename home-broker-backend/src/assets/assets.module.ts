import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
})
// eslint-disable-next-line prettier/prettier
export class AssetsModule { }
