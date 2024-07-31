import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from 'aws-sdk';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

@Injectable()
export class S3Service {
    public readonly s3: S3;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.s3 = new S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
    }
}