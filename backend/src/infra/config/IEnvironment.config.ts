export default interface IEnvironmentConfig {
    getVars(): IEnvironmentVars
}

export interface IEnvironmentVars {
    port: number;
    database: {
        user: string;
        port: number;
        host: string;
        database: string;
        password: string;
    }
} 