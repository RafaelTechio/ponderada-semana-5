import { ICreateQuery, IQuery, IUpdateQuery } from "../../dto/query/IQuery.dto";

export interface IQueryService {
    doAndCreate (data: ICreateQuery): Promise<number>
    create(data: ICreateQuery): Promise<number>
    update(id: number | string, data: IUpdateQuery): Promise<boolean>
    getById(id: string | number): Promise<IQuery | null>;
    list(): Promise<IQuery[]>
    deleteById(id: string | number): Promise<boolean>
}