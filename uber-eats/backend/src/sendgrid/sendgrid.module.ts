import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { SendGridModuleOptions } from './sendgrid.interfaces';
import { SendGridService } from './sendgrid.service';

@Module({})
@Global()
export class SendGridModule {
  static forRoot(options: SendGridModuleOptions): DynamicModule {
    return {
      module: SendGridModule,
      imports: [],
      exports: [SendGridService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        SendGridService,
      ],
    };
  }
}
