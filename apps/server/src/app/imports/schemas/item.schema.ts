import { Schema } from "mongoose";
import { ItemManagement } from "../interfaces/item";

export const ItemSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, default: 'inventory/non-inventory' },
    shortDescription: { type: String },
    description: { type: String },
    vendorId: { type: String, ref: 'Vendor' },
    manufacturerId: { type: String, ref: 'Vendor' },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    availability: { type: String, default: 'available' },
    published: { type: String, default: 'published' },
    isTaxable: { type: Boolean, required: true },
    images: [{ type: String, ref: 'Image' }],
    categoryId: { type: String, ref: 'Category' },
    packagingIds: [{ type: String }],
    unitOfMeasureId: { type: String, required: true },

    // new merged description
    fullDescription: { type: String }
});

export const ImageSchema = new Schema<ItemManagement.Image>({
    url: { type: String, required: true },
    name: { type: String, required: true },
});