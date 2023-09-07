import { ICreateQuery, IQuery, IQueryDatabase, IUpdateQuery } from "../../dto/query/IQuery.dto";
import { IQueryRepository } from "../../repositories/query/IQuery.repository";
import { IQueryService } from "./IQuery.service";
import mysql, { OkPacket } from "mysql";

export default class QueryService implements IQueryService {
    private repository: IQueryRepository;

    constructor(repository: IQueryRepository) {
        this.repository = repository;
    }

    doAndCreate = async (data: ICreateQuery): Promise<number> => {
        try {
            const result = await this.repository.doRequest(data.query);
            data.fields = JSON.stringify(result.fields)
            data.returnedValue = JSON.stringify(result.results);
            
            if(result.results.constructor === Object && result.results.hasOwnProperty('affectedRows')) {
                data.returnedRows = 0;
            } else if(Array.isArray(result)){
                data.returnedRows = result.length;
            }

        } catch (error) {
            const catchedError = error as unknown as any;
            if(catchedError && catchedError.message){
                data.message = catchedError.message;
            } else {
                data.message =  'unknow error';
            }

        }

        return await this.create({
            query: data.query,
            fields: data.fields,
            message: data.message,
            returnedRows: data.returnedRows || 0,
            returnedValue: data.returnedValue
        });
    }

    create = async (data: ICreateQuery): Promise<number> => {
        return await this.repository.create(data);
    }

    deleteById = async (id: string | number): Promise<boolean> => {
        return await this.repository.deleteById(id);
    }

    getById = async (id: string | number): Promise<IQuery | null> => {
        const selectedData = await this.repository.getById(id);
        return this.normalizeQueryDatabase(selectedData);
    }

    list = async (): Promise<IQuery[]> => {
        const selectedList = await this.repository.list();
        return selectedList.map(selectedData => this.normalizeQueryDatabase(selectedData) as IQuery);
    }

    update = async (id: string | number, data: IUpdateQuery): Promise<boolean> => {
        return await this.repository.update(id, data);
    }

    private normalizeQueryDatabase(data?: IQueryDatabase | null): IQuery | null {
        return data ? {
            id: data.id,
            query: data.query,
            returnedRows: data.returnedRows,
            fields: data.fields ? JSON.parse(data.fields) || data.fields : data.fields,
            message: data.message,
            returnedValue: data.returnedValue ? JSON.parse(data.returnedValue) || data.returnedValue :  data.returnedValue,
            createdAt: data.created_at
        } : null
    }
}