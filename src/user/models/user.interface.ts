export interface User {
    iduser?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    active?: number;
}

export enum UserRole{
    ADMIN = 'FNadmin',
    USER = 'FNuser',
}