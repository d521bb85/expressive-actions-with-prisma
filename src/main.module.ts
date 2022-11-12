import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { useCases } from './use-cases';

@Module({
  imports: [],
  controllers: [...useCases.controllers],
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient()
    },
    ...useCases.providers
  ]
})
export class AppModule {}
