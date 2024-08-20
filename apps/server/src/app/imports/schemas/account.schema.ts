import { Schema } from "mongoose";
import { Account } from "../interfaces/account";

export const AddressSchema = new Schema({
    id: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    state: { type: String },
    type: { type: String },
    zip: { type: String, required: true },

    // new merged field
    fullAddress: { type: String }
});

export const AccountSchema = new Schema<Account.Account>({
    name: { type: String, required: true },
    type: { type: String },
    phoneNumber: { type: String },
    website: { type: String },
    notes: { type: String },
    addresses: { type: [AddressSchema] },
    email: { type: String, required: true },
    parentAccountId: { type: String },
});