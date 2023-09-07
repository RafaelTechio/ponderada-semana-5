import express, { Express } from 'express';
import cors from 'cors'
import IEnvironmentConfig from './config/IEnvironment.config';
import MysqlConnection from '../connections/mysql/Mysql.connection';
import QueryRouter from '../routers/Query.router';
import IMysqlConnection from '../connections/mysql/IMysql.connection';
import loggerMiddleware from '../middlewares/logger.middleware';
import EmployeeRouter from '../routers/Employee.router';

export default class App {
    private environmentConfig: IEnvironmentConfig;
    private databaseConnection?: IMysqlConnection;
    private express: Express;
    private port: number;

    constructor(environmentConfig: IEnvironmentConfig) {
        this.environmentConfig = environmentConfig;
        this.express = express();
        this.port = this.environmentConfig.getVars().port;
    }

    configure() {
        this.express.use(express.json());
        this.express.use(loggerMiddleware);
        this.express.use(cors());
    }

    setRouters() {
        const queryRouter = new QueryRouter(this.databaseConnection as MysqlConnection);
        this.express.use("/queries", queryRouter.getRouter());

        const employeeRouter = new EmployeeRouter(this.databaseConnection as MysqlConnection);
        this.express.use("/employees", employeeRouter.getRouter());
    }

    setConnections() {
        this.databaseConnection = new MysqlConnection(this.environmentConfig.getVars().database)
        this.databaseConnection.connect();
    }

    start() {
        this.setConnections();
        this.configure();
        this.setRouters();

        this.express.listen(this.port, () => {
            console.log(`Listening ${this.port} port`)
        })
    }
}