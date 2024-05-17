import * as z from "zod";
import {TypeIncludeHeaders} from "@/lib/definetions";

export const LoginSchema = z.object({
    username: z.string().min(5, {
        message: "min 5 characters",
    }),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const RegisterSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    username: z.string().min(5, {
        message: "min 5 characters",
    }),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),

})

export function createFormSchema(selectedType: TypeIncludeHeaders | null) {
    let schema: any = z.object({
        website: z.string().min(1, 'Website is required'),
        position: z.string().min(1, 'Position is required'),
        dimension: z.string().min(1, 'Dimension is required'),
        platform: z.string().default('PC'),
        demoList: z
            .array(
                z.object({
                    url: z.string().url('Invalid URL format'),
                    display: z.string().min(1, 'Display text is required'),
                }),
            )
            .optional(),
        typeId: z.string().min(1, 'Type ID is required'), // Ensure typeId is included and required
    });

    if (selectedType) {
        let dynamicFields: any = {};
        selectedType.headers.forEach((header) => {
            switch (header.datatype) {
                case 'string':
                    dynamicFields[header.id] = z
                        .string()
                        .min(1, `${header.display} is required`);
                    break;
                case 'number':
                    dynamicFields[header.id] = z.coerce
                        .number()
                        .min(0, `${header.display} must be a positive number`);
                    break;
                case 'boolean':
                    dynamicFields[header.id] = z.coerce.boolean();
                    break;
                default:
                    dynamicFields[header.id] = z
                        .string()
                        .min(1, `${header.display} is required`);
            }
        });
        schema = schema.extend(dynamicFields);
    }

    return schema;
}