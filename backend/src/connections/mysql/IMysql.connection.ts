import mysql from 'mysql';

export default interface IMysqlConnection {
    doQuery(query: string): Promise<{results: any, fields?: mysql.FieldInfo[]}>
    connect(): IMysqlConnection
    escape(value: any): string
    doSelect<T = any>(query: string): Promise<T[]>
    doSelectOne<T = any>(query: string): Promise<T | null>
    doCreate(query: string): Promise<number>
    doUpdate(query: string): Promise<number>
    doDelete(query: string): Promise<number>
}

export interface IMysqlConnectionConfig {
    host: string;
    port: number;
    user: string;
    database: string;
    password: string;
}