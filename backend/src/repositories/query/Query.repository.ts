import { FieldInfo } from "mysql";
import IMysqlConnection from "../../connections/mysql/IMysql.connection";
import { ICreateQuery, IQueryDatabase, IUpdateQuery } from "../../dto/query/IQuery.dto";
import { IQueryRepository } from "./IQuery.repository";

export default class QueryRepository implements IQueryRepository {
    private databaseConnection: IMysqlConnection;

    constructor(connection: IMysqlConnection) {
        this.databaseConnection = connection;
    }

    doRequest = async (query: string): Promise<{results: any, fields?: FieldInfo[]}> => {
        return this.databaseConnection.doQuery(query);
    }

    create = async (data: ICreateQuery): Promise<number> => {
        return await this.databaseConnection.doCreate(`
            INSERT INTO tb_query
            (${Object.keys(data).map(str => str).join(", ")})
            VALUES
            (${Object.values(data).map(value => this.databaseConnection.escape(value)).join(", ")})
        `)
    }

    deleteById = async (id: string | number): Promise<boolean> => {
        const result = await this.databaseConnection.doDelete(`
            DELETE FROM tb_query 
            WHERE tb_query.id = ${this.databaseConnection.escape(id)}
        `)

        return result > 0;
    }

    getById = async (id: string | number): Promise<IQueryDatabase | null> => {
        return await this.databaseConnection.doSelectOne(`
            SELECT *
            FROM tb_query
            WHERE tb_query.id = ${this.databaseConnection.escape(id)}
        `);
    }

    list = async (): Promise<IQueryDatabase[]> => {
        return await this.databaseConnection.doSelect(`
            SELECT *
            FROM tb_query
        `);
    }

    update = async (id: string | number, data: IUpdateQuery): Promise<boolean> => {
        const result = await this.databaseConnection.doUpdate(`
            UPDATE tb_query
            SET ${Object.entries(data).map(entrie => `${entrie[0]} = ${this.databaseConnection.escape(entrie[1])}`).join(", ")}
            WHERE tb_query.id = ${id}
        `)

        return result > 0;
    }
}