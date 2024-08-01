export interface ImportService {
    validateData(data: any[]): Promise<{ data: any[], errors: any[] }>;
    mapData(data: any[]): any[];
    transformData(data: any[]): Promise<any[]>;
}