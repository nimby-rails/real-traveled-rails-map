import { Module } from '@nestjs/common';
import { DataController } from './data.controller';

@Module({
  imports: [],
  controllers: [DataController],
})
export class DataModule {}
