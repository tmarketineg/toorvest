import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List projects with filters' })
  @ApiQuery({ name: 'countryId', required: false })
  @ApiQuery({ name: 'projectType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'sector', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('countryId') countryId?: string,
    @Query('projectType') projectType?: string,
    @Query('status') status?: string,
    @Query('sector') sector?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.projectsService.findAll({
      countryId,
      projectType: projectType as any,
      status: status as any,
      sector,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project detail' })
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
