import { Injectable } from "@nestjs/common";
import { ItemManagement } from "../interfaces/item";
import { validateData } from "../../shared/utils/validation";
import Joi from "joi";
import { ImportManager } from "../interfaces/import-manager";
import { mapFlattenedArray, mapNestedArray } from "../../shared/utils/mapping";
import { batchSave } from "../../shared/utils/batch-save";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { capitalizeFirstLetter, removeDuplicates, roundToTwoDecimals, standardizeType } from "../../shared/utils/transformations";
@Injectable()
export class ItemImportService implements ImportManager {
    constructor(@InjectModel('Item') private readonly itemModel: Model<ItemManagement.Item>) { }

    private imageSchema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required().default('inventory'),
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
            images: mapNestedArray<ItemManagement.Image>(item, 'image', ['name', 'url']),
            categoryId: item.categoryId,
            packagingIds: mapFlattenedArray<string>(item, 'packagingId'),
            unitOfMeasureId: item.unitOfMeasureId,
        }));
    }

    async transformData(data: any[]): Promise<ItemManagement.Item[]> {
        return data.map(item => ({
            ...item,
            name: capitalizeFirstLetter(item.name),
            type: standardizeType(item.type),
            shortDescription: item.shortDescription?.trim(),
            description: item.description?.trim(),
            price: roundToTwoDecimals(item.price),
            currency: item.currency.toUpperCase(),
            availability: item.availability?.toLowerCase() === 'unavailable' ? 'unavailable' : 'available',
            published: item.published?.toLowerCase() === 'unpublished' ? 'unpublished' : 'published',
            isTaxable: !!item.isTaxable,
            images: item.images,
            packagingIds: removeDuplicates(item.packagingIds),
            // New merged field
            fullDescription: `${item.name} - ${item.shortDescription}. Detailed information: ${item.description}`
        }));
    }

    async saveData(data: any[]): Promise<ItemManagement.Item[]> {
        return await batchSave(this.itemModel, data);
    }

}