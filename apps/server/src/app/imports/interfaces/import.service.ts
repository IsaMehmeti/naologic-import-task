
export interface ImportService {
    validateData(data: any[]): Promise<any[]>;
    mapData(data: any[]): any[];
    transformData(data: any[]): Promise<any[]>;
}