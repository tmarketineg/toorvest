import { Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

@Injectable()
export class UploadService {
  constructor() {
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  }

  getUploadDir(): string {
    return UPLOAD_DIR;
  }

  validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const ext = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File too large. Maximum size: 10MB');
    }
  }

  generateFilename(originalName: string): string {
    const ext = extname(originalName).toLowerCase();
    return `${randomUUID()}${ext}`;
  }

  getFileUrl(filename: string): string {
    return `/api/uploads/${filename}`;
  }

  deleteFile(filename: string): boolean {
    const sanitised = filename.replace(/[^a-zA-Z0-9._-]/g, '');
    if (sanitised !== filename || filename.includes('..')) return false;
    const filePath = join(UPLOAD_DIR, sanitised);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      return true;
    }
    return false;
  }

  listFiles(): string[] {
    if (!existsSync(UPLOAD_DIR)) return [];
    return readdirSync(UPLOAD_DIR).filter((file) => {
      const ext = extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    });
  }
}
