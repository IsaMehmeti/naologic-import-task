
export function mapNestedArray<T>(data: any, prefix: string, fields: (keyof T)[]): T[] {
    const result: T[] = [];
    let index = 0;

    while (true) {
        const obj: Partial<T> = {};
        let hasData = false;

        for (const field of fields) {
            const key = `${prefix}.${index}.${field as string}`;
            if (data.hasOwnProperty(key)) {
                obj[field] = data[key];
                hasData = true;
            }
        }

        if (!hasData) break;

        result.push(obj as T);
        index++;
    }

    return result;
}

export function mapFlattenedArray<T>(data: any, prefix: string): T[] {
    const result: T[] = [];
    let index = 0;

    while (data.hasOwnProperty(`${prefix}.${index}`)) {
        const value = data[`${prefix}.${index}`];
        if (value !== null && value !== undefined) {
            result.push(value as T);
        }
        index++;
    }

    return result;
}