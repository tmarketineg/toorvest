import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateFile(file);
    const filename = this.uploadService.generateFilename(file.originalname);
    const url = this.uploadService.getFileUrl(filename);

    const { join } = await import('path');
    const { renameSync } = await import('fs');
    renameSync(file.path, join(this.uploadService.getUploadDir(), filename));

    return { url, filename };
  }

  @Post('images')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload multiple images (max 10)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const results: { url: string; filename: string }[] = [];
    for (const file of files) {
      this.uploadService.validateFile(file);
      const filename = this.uploadService.generateFilename(file.originalname);
      const url = this.uploadService.getFileUrl(filename);

      const { join } = await import('path');
      const { renameSync } = await import('fs');
      renameSync(file.path, join(this.uploadService.getUploadDir(), filename));

      results.push({ url, filename });
    }

    return { files: results };
  }

  @Delete(':filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an uploaded file' })
  async deleteFile(@Param('filename') filename: string) {
    const deleted = this.uploadService.deleteFile(filename);
    if (!deleted) {
      throw new BadRequestException('File not found');
    }
    return { message: 'File deleted successfully' };
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all uploaded files' })
  async listFiles() {
    const files = this.uploadService.listFiles();
    return { files };
  }
}
