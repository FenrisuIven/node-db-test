import { z } from "zod";

export const userDataSchema  = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    password: z.string()
}).partial({
    id: true
});