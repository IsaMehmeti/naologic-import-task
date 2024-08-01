import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';
import { AwsModule } from '../aws/aws.module';
import { AccountImportService } from './services/account-import.service';

@Module({
    imports: [AwsModule],
    providers: [ImportsService, AccountImportService],
    controllers: [ImportsController]
})
export class ImportsModule { }
