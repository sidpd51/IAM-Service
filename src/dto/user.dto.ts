import { JwtPayload } from "jsonwebtoken";

export type signInDto = {
    email: string,
    password: string
}

export enum RoleType {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager"
}

export type UserHasRoleDto = {
    token: string,
    role: RoleType
}

export interface DecodedToken extends JwtPayload {
    id: string;
}

export type AddRoleToUserDto = {
    userId: string,
    roleType: string
}