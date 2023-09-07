import { ICreateEmployee, IEmployee, IEmployeeDatabase, IUpdateEmployee } from "../../dto/employee/IEmployee.dto";
import { IEmployeeRepository } from "../../repositories/employee/IEmployee.repository";
import { IEmployeeService } from "./IEmployee.service";

export default class EmployeeService implements IEmployeeService {
    private repository: IEmployeeRepository;

    constructor(repository: IEmployeeRepository) {
        this.repository = repository;
    }

    create = async (data: ICreateEmployee): Promise<number> => {
        return await this.repository.create(data);
    }

    deleteById = async (id: string | number): Promise<boolean> => {
        return await this.repository.deleteById(id);
    }

    getById = async (id: string | number): Promise<IEmployee | null> => {
        const selectedData = await this.repository.getById(id);
        return this.normalizeEmployeeDatabase(selectedData);
    }

    list = async (): Promise<IEmployee[]> => {
        const selectedList = await this.repository.list();
        return selectedList.map(selectedData => this.normalizeEmployeeDatabase(selectedData) as IEmployee);
    }

    update = async (id: string | number, data: IUpdateEmployee): Promise<boolean> => {
        return await this.repository.update(id, data);
    }

    private normalizeEmployeeDatabase(data?: IEmployeeDatabase | null): IEmployee | null {
        return data ? {
            id: data.id,
            address: data.address,
            name: data.name
        } : null
    }
}