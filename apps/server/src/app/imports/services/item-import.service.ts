import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { ItemManagement } from "../interfaces/item.interface";

@Injectable()
export class ItemImportService {
    async validateData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
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
}