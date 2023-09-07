import { FieldInfo } from "mysql";
import { ICreateEmployee, IEmployee, IEmployeeDatabase, IUpdateEmployee } from "../../dto/employee/IEmployee.dto";

export interface IEmployeeRepository {
    doRequest(query: string): Promise<{results: any, fields?: FieldInfo[]}>
    create(data: ICreateEmployee): Promise<number>
    update(id: number | string, data: IUpdateEmployee): Promise<boolean>
    getById(id: string | number): Promise<IEmployeeDatabase | null>;
    list(): Promise<IEmployeeDatabase[]>
    deleteById(id: string | number): Promise<boolean>
}