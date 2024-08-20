import { Schema } from "mongoose";
import { AddressSchema } from "./account.schema";

// Vendor Schema
export const VendorSchema = new Schema({
    fullName: { type: String, required: true },
    id: { type: String, required: true },

    // <-- changed phoneNumber to 'phone'
    phone: { type: String, required: true },
    contactName: { type: String },
    email: { type: String, required: true },
    addresses: { type: [AddressSchema], required: true },
    createdDate: { type: Date, required: true },
});