import { Router } from "express";
import EmployeeController from "../controllers/Employee.controller";
import EmployeeService from "../services/employee/Employee.service";
import EmployeeRepository from "../repositories/employee/Employee.repository";
import IMysqlConnection from "../connections/mysql/IMysql.connection";
import IRouter from "./IRouter";

export default class EmployeeRouter implements IRouter{
    private router: Router;
    private employeeController: EmployeeController;

    constructor(databaseConnection: IMysqlConnection) {
        this.router = Router();
        this.employeeController = new EmployeeController(new EmployeeService(new EmployeeRepository(databaseConnection)));
        this.setRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    private setRoutes() {
        this.router.get('/:id', this.employeeController.getById)
        this.router.get('/', this.employeeController.list)
        this.router.post('/', this.employeeController.create)
        this.router.patch('/:id', this.employeeController.update)
        this.router.delete('/:id', this.employeeController.deleteById)
    }
}
