export interface IQuery {
    id: number;
    query: string;
    returnedRows: number;
    returnedValue: any;
    message: string | null;
    fields: any;
    createdAt: Date;
}

export interface IQueryDatabase {
    id: number;
    query: string;
    returnedRows: number;
    returnedValue: string | null;
    message: string | null;
    fields: string | null;
    created_at: Date;
}

export interface ICreateQuery {
    query: string;
    returnedRows?: number;
    returnedValue?: string;
    message?: string;
    fields?: string;
}

export interface IUpdateQuery {
    query?: string;
    returnedRows?: number;
    returnedValue?: string;
    message?: string;
    fields?: string;
}