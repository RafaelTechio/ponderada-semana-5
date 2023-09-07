import { Router, query } from "express";
import QueryController from "../controllers/Query.controller";
import QueryService from "../services/query/Query.service";
import QueryRepository from "../repositories/query/Query.repository";
import IMysqlConnection from "../connections/mysql/IMysql.connection";
import IRouter from "./IRouter";

export default class QueryRouter implements IRouter{
    private router: Router;
    private queryController: QueryController;

    constructor(databaseConnection: IMysqlConnection) {
        this.router = Router();
        this.queryController = new QueryController(new QueryService(new QueryRepository(databaseConnection)));
        this.setRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    private setRoutes() {
        this.router.get('/:id', this.queryController.getById)
        this.router.get('/', this.queryController.list)
        this.router.post('/', this.queryController.create)
        this.router.patch('/:id', this.queryController.update)
        this.router.delete('/:id', this.queryController.deleteById)
    }
}
