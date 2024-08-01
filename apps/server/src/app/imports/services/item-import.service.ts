import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { ItemManagement } from "../interfaces/item.interface";
import { validateData } from "../../utils/validation";
import Joi from "joi";
import { ImportService } from "../interfaces/import.service";
@Injectable()
export class ItemImportService implements ImportService {
    private imageSchema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required().default('inventory/non-inventory'),
        shortDescription: Joi.string().optional().allow(''),
        description: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''), // Reference to a Vendor
        manufacturerId: Joi.string().optional().allow(''), // Reference to a Vendor
        price: Joi.number().required(),
        currency: Joi.string().required(),
        availability: Joi.string().optional().allow('').default('available'),
        published: Joi.string().required().default('published'),
        isTaxable: Joi.boolean().required(),
        images: Joi.array().items(Joi.object({
            url: Joi.string().required(),
            name: Joi.string().required(),
        })
        ).optional().allow(''),
        categoryId: Joi.string().optional().allow(''),
        packagingIds: Joi.array().items(Joi.string()).required(),
        unitOfMeasureId: Joi.string().required(),
    });

    async validateData(data: any[]): Promise<{ data: ItemManagement.Item[], errors: any[] }> {
        return await validateData(data, this.imageSchema);
    }

    mapData(data: any[]): ItemManagement.Item[] {
        return data.map(item => ({
            name: item.name,
            type: item.type,
            shortDescription: item.shortDescription,
            description: item.description,
            vendorId: item.vendorId,
            manufacturerId: item.manufacturerId,
            price: item.price,
            currency: item.currency,
            availability: item.availability,
            published: item.published,
            isTaxable: item.isTaxable,
            images: this.mapImages(item),
            categoryId: item.categoryId,
            packagingIds: this.mapPackagingIds(item),
            unitOfMeasureId: item.unitOfMeasureId,
        }));
    }

    private mapImages(data: any): ItemManagement.Image[] {
        const images: ItemManagement.Image[] = [];
        let index = 0;

        while (data.hasOwnProperty(`image.${index}.url`) || data.hasOwnProperty(`image.${index}.name`)) {
            const url = data[`image.${index}.url`];
            const name = data[`image.${index}.name`];

            if (!url && !name) break;

            images.push({
                url,
                name
            });
            index++;
        }

        return images;
    }

    private mapPackagingIds(data: any): string[] {
        const packagingIds: string[] = [];
        let index = 0;

        while (data.hasOwnProperty(`packagingId.${index}`)) {
            const packagingId = data[`packagingId.${index}`];

            if (packagingId !== null) {
                packagingIds.push(packagingId);
            }
            index++;
        }

        return packagingIds;
    }

    async transformData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }
}