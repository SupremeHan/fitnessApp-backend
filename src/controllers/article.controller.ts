import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Put,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Article } from 'entities/Article';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfig } from 'config/storage.config';
import { ArticleService } from 'src/services/article.service';
import { PhotoService } from 'src/services/photo.service';
import { Photo } from 'entities/Photo';
import { ApiResponse } from 'src/misc/api.response';
import * as fs from 'fs';
import * as fileType from 'file-type';
import { AddArticleDto } from 'src/dtos/article/add.article.dto';
import { RoleCheckerGurad } from 'src/misc/role.chacker.guard';
import { AllowToRoles } from 'src/misc/allow.to.roles.descriptor';
import { EditArticleDto } from 'src/dtos/article/edit.article.dto';

@Controller('api/article')
@Crud({
  model: {
    type: Article,
  },
  params: {
    id: {
      field: 'articleId',
      type: 'number',
      primary: true,
    },
  },
})
export class ArticleController {
  constructor(
    public service: ArticleService,
    public photoService: PhotoService,
  ) {}

  @Get()
  getAllArticles(): Promise<Article[]> {
    return this.service.getAll();
  }

  @Put()
  add(@Body() data: AddArticleDto): Promise<Article | ApiResponse> {
    return this.service.add(data);
  }

  @Patch(':id')
  edit(
    @Param('id') id: number,
    @Body() data: EditArticleDto,
  ): Promise<Article | ApiResponse> {
    return this.service.editArticle(id, data);
  }

  @Get('/photo')
  getPhotos(): Promise<Photo[]> {
    return this.photoService.getAll();
  }

  @Post(':id/uploadPhoto/')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: StorageConfig.photo.destination,
        filename: (req, file, callback) => {
          let original = file.originalname;

          let normalized = original.replace(/\s/g, '-');
          normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
          let sada = new Date();
          let datePart = '';
          datePart += sada.getFullYear().toString();
          datePart += (sada.getMonth() + 1).toString();
          datePart += sada.getDate().toString();

          let randomPart: string = new Array(10)
            .fill(0)
            .map(e => (Math.random() * 9).toFixed(0).toString())
            .join('');

          let fileName = datePart + '-' + randomPart + '-' + normalized;
          fileName = fileName.toLocaleLowerCase();

          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
          req.fileFilterError = 'Bad file extension!';
          callback(null, false);
          return;
        }

        if (
          !(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))
        ) {
          req.fileFilterError = 'Bad file content!';
          callback(null, false);
          return;
        }

        callback(null, true);
      },
      limits: {
        files: 1,
        fileSize: StorageConfig.photo.maxSize,
      },
    }),
  )
  async uploadPhoto(
    @Param('id') articleId: number,
    @UploadedFile() photo,
    @Req() req,
  ): Promise<Photo | ApiResponse> {
    if (req.fileFilterError) {
      return new ApiResponse('error', -4002, req.fileFilterError);
    }

    if (!photo) {
      return new ApiResponse('error', -4002, 'File not uploaded!');
    }

    const fileTypeResult = await fileType.fromFile(photo.path);
    if (!fileTypeResult) {
      fs.unlinkSync(photo.path);

      return new ApiResponse('error', -4002, 'Cannot detect file type!');
    }

    const realMimeType = fileTypeResult.mime;
    if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
      fs.unlinkSync(photo.path);

      return new ApiResponse('error', -4002, 'Cannot detect file type!');
    }

    const newPhoto: Photo = new Photo();
    newPhoto.articleId = articleId;
    newPhoto.imagePath = photo.filename;

    const savedPhoto = await this.photoService.add(newPhoto);
    if (!savedPhoto) {
      return new ApiResponse('error', -4001);
    }

    return savedPhoto;
  }
}
