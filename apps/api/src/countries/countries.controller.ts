import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all active countries' })
  async findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get country detail by ID' })
  async findOne(@Param('id') id: string) {
    const country = await this.countriesService.findById(id);
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  @Get('by-code/:code')
  @ApiOperation({ summary: 'Get country detail by code (e.g. ae, sa, eg)' })
  async findByCode(@Param('code') code: string) {
    const country = await this.countriesService.findByCode(code);
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  @Get(':id/emirates')
  @ApiOperation({ summary: 'Get emirates for a country' })
  async getEmirates(@Param('id') id: string) {
    return this.countriesService.getEmirates(id);
  }

  @Get(':id/tips')
  @ApiOperation({ summary: 'Get tips for a country' })
  async getTips(@Param('id') id: string) {
    return this.countriesService.getTips(id);
  }

  @Get(':id/tourism')
  @ApiOperation({ summary: 'Get tourism activities for a country' })
  async getTourism(@Param('id') id: string) {
    return this.countriesService.getTourismActivities(id);
  }

  @Get(':id/articles')
  @ApiOperation({ summary: 'Get articles for a country' })
  async getArticles(@Param('id') id: string) {
    return this.countriesService.getArticles(id);
  }
}
