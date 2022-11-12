import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class TransformResponseInterceptor<T> implements NestInterceptor {
  constructor(private ResponseDTO: ClassConstructor<T>) {}

  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<T> {
    return next
      .handle()
      .pipe(map((output) => plainToInstance(this.ResponseDTO, output)));
  }
}
