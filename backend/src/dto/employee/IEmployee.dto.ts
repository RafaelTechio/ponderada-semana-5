export interface IEmployee {
    id: number;
    name: string | null;
    address: string | null;
}

export interface IEmployeeDatabase {
    id: number;
    name: string | null;
    address: string | null;
}

export interface ICreateEmployee {
    name?: string | null;
    address?: string | null;
}

export interface IUpdateEmployee {
    name?: string | null;
    address?: string | null;
}