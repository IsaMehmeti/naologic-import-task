import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';
import { AwsModule } from '../aws/aws.module';
import { AccountImportService } from './services/account-import.service';
import { ItemImportService } from './services/item-import.service';
import { VendorImportService } from './services/vendor-import.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';
import { ItemSchema } from './schemas/item.schema';
import { VendorSchema } from './schemas/vendor.schema';

@Module({
    imports: [
        AwsModule,
        MongooseModule.forFeature([
            { name: 'Account', schema: AccountSchema },
            { name: 'Item', schema: ItemSchema },
            { name: 'Vendor', schema: VendorSchema }
        ])
    ],
    providers: [ImportsService, AccountImportService, ItemImportService, VendorImportService],
    controllers: [ImportsController]
})
export class ImportsModule { }
