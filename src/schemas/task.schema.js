import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
        }).min(2, {
            message: 'Title must be at least 2 characters',
        }),
    description: z
        .string({
            required_error: 'Description must be a string',
        }).min(2, {
            message: 'Description must be at least 2 characters',
        }),
    date: z
        .coerce.date({ //coerce es para forzar el tipo de dato a date
            invalid_type_error: "Invalid date format",
        })
        .optional(),
});