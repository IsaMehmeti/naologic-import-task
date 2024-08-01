export namespace Vendor {
    export interface Vendor {
        name: string;
        id: string;
        phoneNumber: string;
        contactName?: string;
        email: string;
        addresses: Vendor.Address[];
        createdDate: Date;
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
