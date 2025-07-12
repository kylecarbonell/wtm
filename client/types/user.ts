import z from 'zod';

const zUser = z.object({
    email: z.string(),
    id: z.string(),
    name: z.string(),
});

type User = z.infer<typeof zUser>;

export const zUserLogin = z.object({
    token: z.string(),
    user: zUser,
});

type UserLogin = z.infer<typeof zUserLogin>;
