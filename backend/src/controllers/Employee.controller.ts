import { Request, Response } from "express";
import { ICreateEmployee, IUpdateEmployee } from "../dto/employee/IEmployee.dto";
import { IEmployeeService } from "../services/employee/IEmployee.service";

export default class EmployeeController {
    private employeeService: IEmployeeService;

    constructor(employeeService: IEmployeeService) {
        this.employeeService = employeeService;
    }

    create = async (req: Request, res: Response) => {
        const body = req.body as ICreateEmployee;
        console.log(body);
        const createdId = await this.employeeService.create(body);
        const createdData = await this.employeeService.getById(createdId);
        res.json(createdData);
    }

    update = async (req: Request<{id: string}>, res: Response) => {
        const body = req.body as IUpdateEmployee;
        await this.employeeService.update(req.params.id, body);
        const updatedData = await this.employeeService.getById(req.params.id);
        res.json(updatedData);
    }

    getById = async (req: Request<{id: string}>, res: Response) => {
        const selectedData = await this.employeeService.getById(req.params.id);
        res.json(selectedData);
    }

    list = async (req: Request, res: Response) => {
        const selectedList = await this.employeeService.list();
        res.json(selectedList);
    }

    deleteById = async (req: Request<{id: string}>, res: Response) => {
        const selectedList = await this.employeeService.deleteById(req.params.id);
        res.json(selectedList);
    }
}