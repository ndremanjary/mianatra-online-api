import { Role } from '../../../generated/prisma/client.js';

export interface User {
    id: string;
    email: string;
    password: string;
    roles: Role[];
    createdAt: Date;
}