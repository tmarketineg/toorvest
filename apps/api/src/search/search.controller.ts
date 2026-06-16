import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Global search across all entities' })
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'type', required: false, enum: ['articles', 'companies', 'projects', 'countries'] })
  async search(
    @Query('q') q: string,
    @Query('type') type?: string,
  ) {
    return this.searchService.search(q, type as any);
  }
}
