import { CountryCode, parsePhoneNumber } from "libphonenumber-js";
import { getCode } from 'country-list';


export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function standardizeType(type: string): string {
    return ['inventory', 'non-inventory'].includes(type.toLowerCase())
        ? type.toLowerCase()
        : 'inventory';
}

export function roundToTwoDecimals(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}


export function formatPhoneNumber(phone: string | undefined): string | undefined {
    if (!phone) return undefined;
    try {
        const phoneNumber = parsePhoneNumber(phone, 'US' as CountryCode);
        return phoneNumber.formatInternational();
    } catch (error) {
        return phone;
    }
}

export function convertCountryToISO3(country: string): string {
    const code = getCode(country);
    if (code) return code;

    // <-- If not found, return original
    return country;
}

export function createFullAddress(address: any): string {
    return `${address.line1}, ${address.line2 ? address.line2 + ', ' : ''}${address.city}, ${address.state} ${address.zip}, ${address.country}`;
}

export function convertStringToDate(dateStr: string): Date {
    return new Date(dateStr);
}

export function removeDuplicates(arr: string[]): string[] {
    return [...new Set(arr)];
}

export function standardizeAddressType(type?: string): string | undefined {
    if (!type) return undefined;
    return ['shipping', 'billing'].includes(type.toLowerCase())
        ? type.toLowerCase()
        : undefined;
}