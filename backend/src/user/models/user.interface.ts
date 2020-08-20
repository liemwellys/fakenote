export interface User {
    iduser?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    active?: number;
    profileImage?: string;
}

export enum UserRole{
    ADMIN = 'FNadmin',
    USER = 'FNuser',
}

export enum Active{
    ACTIVE = 1,
    NONACTIVE = 0,
}