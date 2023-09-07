import dotenv from 'dotenv';
import IEnvironmentConfig, { IEnvironmentVars } from './IEnvironment.config';

export default class EnvironmentConfig implements IEnvironmentConfig{
    private vars: IEnvironmentVars

    constructor(envPath: string = `${__dirname}/../../../.env`){
        dotenv.config({path: envPath});
        this.vars = this.getVarsByProcessEnv()
    }

    private getVarsByProcessEnv() {
        return {
            port: Number(process.env.PORT),
            database: {
                user: String(process.env.DATABASE_USER),
                database: String(process.env.DATABASE),
                host: String(process.env.DATABASE_HOST),
                port: Number(process.env.DATABASE_PORT),
                password: String(process.env.DATABASE_PASSWORD),
            }
        }
    }

    getVars(): IEnvironmentVars {
        return this.vars;
    }
}