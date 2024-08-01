import { Body, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { S3Service } from '../aws/s3.service';
import { ImportTypeValidationPipe } from './validation/import-type.validation.pipe';
import { ImportType } from './enums/import-type.enum';
import { AccountImportService } from './services/account-import.service';
import { ItemImportService } from './services/item-import.service';
import { VendorImportService } from './services/vendor-import.service';

@Controller('imports')
export class ImportsController {
    constructor(
        private readonly importsService: ImportsService,
        private readonly s3Service: S3Service,
        private readonly accountImportService: AccountImportService,
        private readonly itemImportService: ItemImportService,
        private readonly vendorImportService: VendorImportService,
    ) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async import(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // <-- 50MB for now
            ],
        })) file: Express.Multer.File,
        @Body('type', ImportTypeValidationPipe) type: ImportType,
    ) {
        // <-- handle parsing csv or excel files
        const fileType = this.importsService.getFileType(file.originalname)
        let result: any[];
        if (fileType === 'csv') {
            result = (await this.importsService.parseCSV(file.buffer)).data;
        } else {
            result = this.importsService.parseExcel(file.buffer);
        }

        // <-- get import service type based on type body param
        const typeImportService = this[`${type}ImportService`];
        const mappedData = typeImportService.mapData(result);
        const validatedResult = await typeImportService.validateData(mappedData);

        return validatedResult;


        // const transformedDta = typeImportService.transFormData(mappedData);

        await this.s3Service.uploadObject(file.buffer, file.originalname, 'naologic-task-isa');
    }
}
