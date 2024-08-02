import { Model } from "mongoose";

export async function batchSave<T>(model: Model<T>, data: T[], batchSize: number = 10): Promise<T[]> {
    const savedData: T[] = [];

    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        const result = await model.insertMany(batch);
        savedData.push(...result);
    }

    return savedData;
}