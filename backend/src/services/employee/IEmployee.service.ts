import { ICreateEmployee, IEmployee, IUpdateEmployee } from "../../dto/employee/IEmployee.dto";

export interface IEmployeeService {
    create(data: ICreateEmployee): Promise<number>
    update(id: number | string, data: IUpdateEmployee): Promise<boolean>
    getById(id: string | number): Promise<IEmployee | null>;
    list(): Promise<IEmployee[]>
    deleteById(id: string | number): Promise<boolean>
}