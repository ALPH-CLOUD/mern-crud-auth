import {z} from 'zod';

// validación de esquema para crear una tarea
export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    description: z.string({
        required_error: 'Description must be a string',
    }),
    date: z.string().datetime().optional(),
    
})