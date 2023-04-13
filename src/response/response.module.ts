import { Global, Module } from '@nestjs/common';
import { ResponseService } from 'src/response/response.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'ResponseService',
      useClass: ResponseService,
    },
  ],
  exports: [ResponseService],
})
export class ResponseModule {}
