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
        let addressIndex = 0;

        while (true) {
            const id = data[`address.${addressIndex}.id`];
            const city = data[`address.${addressIndex}.city`];

            if (!id && !city) break;

            addresses.push({
                id: id,
                city: data[`address.${addressIndex}.city`] || '',
                country: data[`address.${addressIndex}.country`],
                line1: data[`address.${addressIndex}.line1`],
                line2: data[`address.${addressIndex}.line2`],
                state: data[`address.${addressIndex}.state`],
                type: data[`address.${addressIndex}.type`],
                zip: data[`address.${addressIndex}.zip`] || '',
            });
            addressIndex++;
        }

        return addresses;
    }

    async transformData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }
}