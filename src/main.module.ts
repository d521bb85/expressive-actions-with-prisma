import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '@/modules/app';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AppModule]
})
export class MainModule {}
