import { Request, Response } from "express";
import { ICreateQuery, IUpdateQuery } from "../dto/query/IQuery.dto";
import { IQueryService } from "../services/query/IQuery.service";

export default class QueryController {
    private queryService: IQueryService;

    constructor(queryService: IQueryService) {
        this.queryService = queryService;
    }

    create = async (req: Request, res: Response) => {
        const body = req.body as ICreateQuery;
        const createdId = await this.queryService.doAndCreate(body);
        const createdData = await this.queryService.getById(createdId);
        res.json(createdData);
    }

    update = async (req: Request<{id: string}>, res: Response) => {
        const body = req.body as IUpdateQuery;
        await this.queryService.update(req.params.id, body);
        const updatedData = await this.queryService.getById(req.params.id);
        res.json(updatedData);
    }

    getById = async (req: Request<{id: string}>, res: Response) => {
        const selectedData = await this.queryService.getById(req.params.id);
        res.json(selectedData);
    }

    list = async (req: Request, res: Response) => {
        const selectedList = await this.queryService.list();
        res.json(selectedList);
    }

    deleteById = async (req: Request<{id: string}>, res: Response) => {
        return await this.queryService.deleteById(req.params.id);
    }
}