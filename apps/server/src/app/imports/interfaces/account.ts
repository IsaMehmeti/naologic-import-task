export namespace Account {
    export interface Account {
        name: string;
        type?: string;
        phoneNumber?: string;
        website?: string;
        notes?: string;
        addresses?: Account.Address[];
        email: string;
        parentAccountId?: string; // Reference to another Account document
    }
    export interface Address {
        id: string;
        city: string;
        country: string;
        line1: string;
        line2?: string;
        state?: string;
        /** This would be the address type, you could have shipping or billing address */
        type?: string;
        zip: string;
    }

}