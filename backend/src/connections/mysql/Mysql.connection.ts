import mysql from "mysql";
import IMysqlConnection, { IMysqlConnectionConfig } from "./IMysql.connection";

export default class MysqlConnection implements IMysqlConnection {
    private mysqlConnection: mysql.Connection;

    constructor(mysqlConnectionConfig: IMysqlConnectionConfig) {
        this.mysqlConnection = mysql.createConnection({ ...mysqlConnectionConfig, })
    }

    connect = (): IMysqlConnection => {
        this.mysqlConnection.connect((error) => {
            if(error) {throw error}
            console.log(`Conected to database`);
        });
        return this;
    }

    doQuery = <T = any>(query: string): Promise<{results: T, fields?: mysql.FieldInfo[]}> => {
        console.log(query)
        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, (error, results, fields) => {
                if(error) reject(error);
                resolve({results, fields});
            })
        });
    }

    async doSelect<T = any>(query: string): Promise<T[]> {
        const result = await this.doQuery<T[]>(query);
        return result.results;
    }

    async doSelectOne<T = any>(query: string): Promise<T | null> {
        const result = await this.doQuery<T[]>(query);
        return result.results[0];
    }

    async doCreate(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.insertId;
    }

    async doUpdate(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.affectedRows;
    }

    async doDelete(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.affectedRows;
    }

    escape(value: any): string {
        return this.mysqlConnection.escape(value);
    }
}