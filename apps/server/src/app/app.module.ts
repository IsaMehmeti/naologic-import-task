import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL') + '/' + configService.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    ImportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
