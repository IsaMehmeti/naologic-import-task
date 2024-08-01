import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { S3Service } from '../aws/s3.service';
import { ImportTypeValidationPipe } from './validation/import-type.validation.pipe';
import { ImportType } from './enums/import-type.enum';

@Controller('imports')
export class ImportsController {
    constructor(
        private readonly importsService: ImportsService,
        private readonly s3Service: S3Service
    ) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async import(@UploadedFile() file: Express.Multer.File,
        @Body('type', ImportTypeValidationPipe) type: ImportType,
    ) {
        const result: any = await this.importsService.parseCSV(file.buffer);


        await this.s3Service.uploadObject(file.buffer, file.originalname, 'naologic-task-isa');
    }
}
