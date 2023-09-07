import { FieldInfo } from "mysql";
import IMysqlConnection from "../../connections/mysql/IMysql.connection";
import { ICreateEmployee, IEmployeeDatabase, IUpdateEmployee } from "../../dto/employee/IEmployee.dto";
import { IEmployeeRepository } from "./IEmployee.repository";

export default class EmployeeRepository implements IEmployeeRepository {
    private databaseConnection: IMysqlConnection;

    constructor(connection: IMysqlConnection) {
        this.databaseConnection = connection;
    }

    doRequest = async (employee: string): Promise<{results: any, fields?: FieldInfo[]}> => {
        return this.databaseConnection.doQuery(employee);
    }

    create = async (data: ICreateEmployee): Promise<number> => {
        return await this.databaseConnection.doCreate(`
            INSERT INTO tb_employee
            (${Object.keys(data).map(str => str).join(", ")})
            VALUES
            (${Object.values(data).map(value => this.databaseConnection.escape(value)).join(", ")})
        `)
    }

    deleteById = async (id: string | number): Promise<boolean> => {
        const result = await this.databaseConnection.doDelete(`
            DELETE FROM tb_employee 
            WHERE tb_employee.id = ${this.databaseConnection.escape(id)}
        `)

        return result > 0;
    }

    getById = async (id: string | number): Promise<IEmployeeDatabase | null> => {
        return await this.databaseConnection.doSelectOne(`
            SELECT *
            FROM tb_employee
            WHERE tb_employee.id = ${this.databaseConnection.escape(id)}
        `);
    }

    list = async (): Promise<IEmployeeDatabase[]> => {
        return await this.databaseConnection.doSelect(`
            SELECT *
            FROM tb_employee
        `);
    }

    update = async (id: string | number, data: IUpdateEmployee): Promise<boolean> => {
        const result = await this.databaseConnection.doUpdate(`
            UPDATE tb_employee
            SET ${Object.entries(data).map(entrie => `${entrie[0]} = ${this.databaseConnection.escape(entrie[1])}`).join(", ")}
            WHERE tb_employee.id = ${id}
        `)

        return result > 0;
    }
}