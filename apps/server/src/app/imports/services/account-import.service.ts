import { Injectable } from "@nestjs/common";
import { ImportService } from "../interfaces/import.service";
import { resolve } from "path";
import { Account } from "../interfaces/account.interface";
import Joi from "joi";
import { validateData } from "../../utils/validation"

@Injectable()
export class AccountImportService implements ImportService {
    private accountSchema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().allow(''),
        phoneNumber: Joi.string().allow(''),
        website: Joi.string().uri().allow(''),
        notes: Joi.string().allow(''),
        email: Joi.string().email().required(),
        parentAccountId: Joi.string().allow(''),
        addresses: Joi.array().items(Joi.object({
            id: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            line1: Joi.string().required(),
            line2: Joi.string().optional().allow(''),
            state: Joi.string().optional().allow(''),
            type: Joi.string().optional().allow(''),
            zip: Joi.string().required()
        }))
    });

    async validateData(data: any[]): Promise<{ data: Account.Account[], errors: any[] }> {
        return await validateData(data, this.accountSchema);
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
                zip: data[`address.${index}.zip`],
            });
            index++;
        }

        return addresses;
    }

    async transformData(data: any[]): Promise<any[]> {
        return Promise.all(resolve());
    }
}