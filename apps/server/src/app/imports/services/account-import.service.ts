import { Injectable } from "@nestjs/common";
import { ImportManager } from "../interfaces/import-manager";
import { Account } from "../interfaces/account";
import Joi from "joi";
import { validateData } from "../../shared/utils/validation"
import { batchSave } from "../../shared/utils/batch-save";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { formatPhoneNumber, convertCountryToISO3, createFullAddress } from "../../shared/utils/transformations";
import { mapNestedArray } from "../../shared/utils/mapping";

@Injectable()
export class AccountImportService implements ImportManager {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account.Account>) { }

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
        return await validateData<Account.Account>(data, this.accountSchema);
    }

    mapData(data: any[]): Account.Account[] {
        return data.map(item => ({
            name: item.name,
            type: item.type,
            phoneNumber: item.phoneNumber,
            website: item.website,
            notes: item.notes,
            addresses: mapNestedArray<Account.Address>(item, 'address', [
                'id', 'city', 'country', 'line1', 'line2', 'state', 'type', 'zip'
            ]),
            email: item.email,
            parentAccountId: item.parentAccountId,
        }));
    }

    async transformData(data: any[]): Promise<Account.Account[]> {
        return data.map(account => ({
            ...account,
            phoneNumber: formatPhoneNumber(account.phoneNumber),
            addresses: account.addresses?.map(address => ({
                ...address,
                country: convertCountryToISO3(address.country),
                fullAddress: createFullAddress(address)
            }))
        }));
    }

    async saveData(data: any[]): Promise<Account.Account[]> {
        return await batchSave(this.accountModel, data);
    }
}