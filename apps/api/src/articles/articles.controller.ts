import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'List articles with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'countryId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'module', required: false, enum: ['BUSINESS_HUB', 'INVESTMENT_TOURISM'] })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('countryId') countryId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('module') module?: string,
    @Query('status') status?: string,
  ) {
    return this.articlesService.findAll({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? Math.min(parseInt(limit, 10), 100) : 20,
      countryId,
      categoryId,
      module,
      status,
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search articles by query' })
  @ApiQuery({ name: 'q', required: true })
  async search(@Query('q') q: string) {
    return this.articlesService.search(q);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article by slug' })
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.articlesService.findBySlug(slug);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create article (admin only)' })
  async create(@Request() req, @Body() dto: CreateArticleDto) {
    return this.articlesService.create(req.user.id, dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update article (admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete article (admin only)' })
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
