export interface FNPost {
    idpost?: number;
    content?: string;
    active?: number;
}

export enum Active{
    ACTIVE = 1,
    NONACTIVE = 0,
}