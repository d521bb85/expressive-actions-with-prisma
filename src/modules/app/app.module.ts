import { PrismaClient } from '@prisma/client';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileModule } from '@/modules/file';
import { useCases } from './use-cases';
import { AuthMiddleware } from './auth';

@Module({
  imports: [
    FileModule.forRoot({
      useFactory: (config: ConfigService) => {
        const endpoint = config.get<string>('S3_ENDPOINT');
        const region = config.get<string>('S3_REGION');
        const accessKeyId = config.get<string>('S3_ACCESS_KEY_ID');
        const secretAccessKey = config.get<string>('S3_SECRET_ACCESS_KEY');
        const bucket = config.get<string>('S3_BUCKET');
        const publicBaseURL = config.get('PUBLIC_BASE_URL');
        return {
          publicBaseURL,
          s3: { endpoint, region, accessKeyId, secretAccessKey, bucket }
        };
      },
      inject: [ConfigService]
    })
  ],
  controllers: [...useCases.controllers],
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient()
    },
    ...useCases.providers
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
