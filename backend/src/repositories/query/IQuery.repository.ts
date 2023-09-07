import { FieldInfo } from "mysql";
import { ICreateQuery, IQuery, IQueryDatabase, IUpdateQuery } from "../../dto/query/IQuery.dto";

export interface IQueryRepository {
    doRequest(query: string): Promise<{results: any, fields?: FieldInfo[]}>
    create(data: ICreateQuery): Promise<number>
    update(id: number | string, data: IUpdateQuery): Promise<boolean>
    getById(id: string | number): Promise<IQueryDatabase | null>;
    list(): Promise<IQueryDatabase[]>
    deleteById(id: string | number): Promise<boolean>
}