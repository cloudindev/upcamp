import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { PlanningService } from './planning.service';
import { PlanningQueryDto } from './dto/planning-query.dto';

@Controller('planning')
@UseGuards(JwtAuthGuard)
export class PlanningController {
    constructor(private readonly planningService: PlanningService) { }

    @Get()
    async getPlanningData(
        @Request() req,
        @Query() query: PlanningQueryDto,
    ) {
        return this.planningService.getPlanningData(req.user.tenantId, query);
    }
}
