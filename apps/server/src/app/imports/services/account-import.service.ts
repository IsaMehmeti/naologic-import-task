import { Injectable } from "@nestjs/common";
import { ImportService } from "../interfaces/import.service";
import { resolve } from "path";
import { Account } from "../interfaces/account.interface";

@Injectable()
export class AccountImportService implements ImportService {

    async validateData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }

    mapData(data: any[]): Account.Account[] {
        return data.map(item => ({
            name: item.name,
            type: item.type,
            phoneNumber: item.phoneNumber,
            website: item.website,
            notes: item.notes,
            addresses: this.mapAddresses(item),
            email: item.email,
            parentAccountId: item.parentAccountId,
        }));
    }

    private mapAddresses(data: any): Account.Address[] {
        const addresses: Account.Address[] = [];
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

    async transformData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }
}