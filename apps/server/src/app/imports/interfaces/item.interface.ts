export namespace ItemManagement {
    export interface Item {
        name: string;
        /** @default inventory/non-inventory */
        type: string;
        shortDescription?: string;
        description?: string;
        vendorId?: string; // Reference to a Vendor
        manufacturerId?: string; // Reference to a Vendor
        price: number;
        currency: string;
        /** @default available */
        availability?: string;
        /**
         * published or unpublished
         * @default published
         */
        published: string;
        isTaxable: boolean;
        images?: ItemManagement.Image[];
        categoryId?: string;
        packagingIds: string[];
        unitOfMeasureId: string;
    }
    export interface Image {
        url: string;
        name: string;
    }
}
