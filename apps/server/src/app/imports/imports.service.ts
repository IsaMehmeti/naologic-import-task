import { Injectable, UnsupportedMediaTypeException } from "@nestjs/common";
import * as Papa from 'papaparse';
import * as stream from 'stream';
import * as XLSX from 'xlsx';
import * as path from 'path';
@Injectable()
export class ImportsService {
    async parseCSV(file: Buffer): Promise<Papa.ParseResult<any>> {
        return new Promise((resolve, reject) => {
            const bufferStream = new stream.PassThrough();
            bufferStream.end(file);
            Papa.parse(bufferStream, {
                header: true,
                complete: function (results: Papa.ParseResult<any>) {
                    resolve(results);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    parseExcel(buffer: Buffer): any[] {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet);
    }

    getFileType(filename: string): string {
        const ext = path.extname(filename).toLowerCase();
        switch (ext) {
            case '.csv':
                return 'csv';
            case '.xls':
            case '.xlsx':
                return 'excel';
            default:
                throw new UnsupportedMediaTypeException('Unsupported file type');
        }
    }
}