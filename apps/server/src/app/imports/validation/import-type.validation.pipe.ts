import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ImportType } from '../enums/import-type.enum';

@Injectable()
export class ImportTypeValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!Object.values(ImportType).includes(value)) {
            throw new BadRequestException(`Invalid import type. Allowed types are: ${Object.values(ImportType).join(', ')}`);
        }
        return value;
    }
}