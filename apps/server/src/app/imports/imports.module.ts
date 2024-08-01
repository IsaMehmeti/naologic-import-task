import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';
import { AwsModule } from '../aws/aws.module';

@Module({
    imports: [AwsModule],
    providers: [ImportsService],
    controllers: [ImportsController]
})
export class ImportsModule { }
