import { Controller, Get, Param } from "@nestjs/common";
import { Stats } from "entities/Stats";
import { ApiResponse } from "src/misc/api.response";
import { StatsService } from "src/services/stats.service";

@Controller('api/stats')
export class StatsController {
    constructor(private statsService: StatsService) { }

    @Get()
    getAll(): Promise<Stats[]> {
        return this.statsService.getAll();
    }

    @Get(':id')
    getById(@Param('id') statsId: number): Promise<Stats | ApiResponse> {
        return new Promise(async resolve => {
            let stats = await this.statsService.getById(statsId);

            if (stats === undefined) {
                resolve(new ApiResponse('error', -6002));
            }
            resolve(stats);
        });
    }
}