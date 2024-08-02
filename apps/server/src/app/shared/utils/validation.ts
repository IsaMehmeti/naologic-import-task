import Joi from "joi";

export async function validateData<T>(data: T[], schema: Joi.Schema): Promise<{ data: T[], errors: any[] }> {
    const validData: T[] = [];
    const errors: any[] = [];

    for (let i = 0; i < data.length; i++) {
        const { error, value } = schema.validate(data[i], { abortEarly: false });

        if (error) {
            errors.push({
                row: i,
                errors: error.details.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        validData.push(value);
    }

    return { data: validData, errors };
}