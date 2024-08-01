import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';
import { AwsModule } from '../aws/aws.module';
import { AccountImportService } from './services/account-import.service';
import { ItemImportService } from './services/item-import.service';
import { VendorImportService } from './services/vendor-import.service';

@Module({
    imports: [AwsModule],
    providers: [ImportsService, AccountImportService, ItemImportService, VendorImportService],
    controllers: [ImportsController]
})
export class ImportsModule { }
