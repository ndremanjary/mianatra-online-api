import { User } from "../../users/interfaces/users.interface";

export interface LoginResponse extends User {
    accessToken: string;
}