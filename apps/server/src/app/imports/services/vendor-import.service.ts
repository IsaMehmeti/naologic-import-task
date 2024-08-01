import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { Vendor } from "../interfaces/vendor.interface";

@Injectable()
export class VendorImportService {
    async validateData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }

    mapData(data: any[]): Vendor.Vendor[] {
        return data.map(item => ({
            name: item.name,
            id: item.id,
            phoneNumber: item.phoneNumber,
            contactName: item.contactName,
            email: item.email,
            addresses: this.mapAddresses(item),
            createdDate: item.createdDate
        }));
    }

    private mapAddresses(data: any): Vendor.Address[] {
        const addresses: Vendor.Address[] = [];
        let index = 0;

        while (data.hasOwnProperty(`address.${index}.id`) || data.hasOwnProperty(`image.${index}.city`)) {
            const id = data[`address.${index}.id`];
            const city = data[`address.${index}.city`];

            if (!id && !city) break;

            addresses.push({
                id: id,
                city: data[`address.${index}.city`] || '',
                country: data[`address.${index}.country`],
                line1: data[`address.${index}.line1`],
                line2: data[`address.${index}.line2`],
                state: data[`address.${index}.state`],
                type: data[`address.${index}.type`],
                zip: data[`address.${index}.zip`] || '',
            });
            index++;
        }

        return addresses;
    }

}