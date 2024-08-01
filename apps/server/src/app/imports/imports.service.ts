import { Injectable } from "@nestjs/common";
import * as Papa from 'papaparse'
import * as stream from 'stream'

@Injectable()
export class ImportsService {

    async parseCSV(file: Buffer) {
        return new Promise((resolve, reject) => {
            const bufferStream = new stream.PassThrough();
            bufferStream.end(file);
            Papa.parse(bufferStream, {
                header: true,
                complete: function (results) {
                    console.log(results, 'results');
                    resolve(results);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });

    }
}