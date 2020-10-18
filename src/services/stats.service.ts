import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stats } from "entities/Stats";
import { Repository } from "typeorm";

@Injectable()
export class StatsService {
    constructor(@InjectRepository(Stats)
                private readonly stats: Repository<Stats>,
    ) {}


    getAll(): Promise<Stats[]> {
        return this.stats.find();
    }

    getById(id: number): Promise<Stats> {
        return this.stats.findOne(id);
    }
}