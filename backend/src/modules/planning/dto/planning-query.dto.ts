import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class PlanningQueryDto {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsOptional()
    @IsUUID()
    siteId?: string;

    @IsOptional()
    @IsUUID()
    zoneId?: string;

    @IsOptional()
    @IsUUID()
    unitTypeId?: string;
}
