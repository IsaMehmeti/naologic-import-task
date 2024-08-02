import { Injectable } from "@nestjs/common";
import { Vendor } from "../interfaces/vendor";
import Joi from "joi";
import { validateData } from "../../shared/utils/validation";
import { ImportManager } from "../interfaces/import-manager";
import { mapNestedArray } from "../../shared/utils/mapping";
import { batchSave } from "../../shared/utils/batch-save";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { capitalizeFirstLetter, convertCountryToISO3, convertStringToDate, createFullAddress, formatPhoneNumber, standardizeAddressType } from "../../shared/utils/transformations";

@Injectable()
export class VendorImportService implements ImportManager {
    constructor(@InjectModel('Vendor') private readonly vendorModel: Model<Vendor.Vendor>) { }

    private vendorSchema = Joi.object({
        name: Joi.string().required(),
        id: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        contactName: Joi.string().optional().allow(''),
        email: Joi.string().email().required(),
        addresses: Joi.array().items(Joi.object({
            id: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            line1: Joi.string().required(),
            line2: Joi.string().optional().allow(''),
            state: Joi.string().optional().allow(''),
            type: Joi.string().optional().allow(''),
            zip: Joi.string().required()
        })),
        createdDate: Joi.date().required(),
    });

    async validateData(data: any[]): Promise<{ data: Vendor.Vendor[], errors: any[] }> {
        return await validateData(data, this.vendorSchema);
    }

    mapData(data: any[]): Vendor.Vendor[] {
        return data.map(item => ({
            name: item.name,
            id: item.id,
            phoneNumber: item.phoneNumber,
            contactName: item.contactName,
            email: item.email,
            addresses: mapNestedArray<Vendor.Address>(item, 'address', [
                'id', 'city', 'country', 'line1', 'line2', 'state', 'type', 'zip'
            ]),
            createdDate: item.createdDate
        }));
    }


    async transformData(data: any[]): Promise<Vendor.Vendor[]> {
        return data.map(vendor => ({
            ...vendor,
            name: capitalizeFirstLetter(vendor.name),
            phoneNumber: formatPhoneNumber(vendor.phoneNumber),
            email: vendor.email.toLowerCase(),
            addresses: vendor.addresses.map((address: Vendor.Address) => ({
                ...address,
                country: convertCountryToISO3(address.country),
                type: standardizeAddressType(address.type),
                // New merged field for address
                fullAddress: createFullAddress(address)
            })),
            createdDate: convertStringToDate(vendor.createdDate),
        }));
    }

    async saveData(data: any[]): Promise<Vendor.Vendor[]> {
        return await batchSave(this.vendorModel, data);
    }
}