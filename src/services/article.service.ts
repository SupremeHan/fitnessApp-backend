import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Article } from 'entities/Article';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/misc/api.response';
import { AddArticleDto } from 'src/dtos/article/add.article.dto';
import { resolve } from 'path';
import { Photo } from 'entities/Photo';
import { EditArticleDto } from 'src/dtos/article/edit.article.dto';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly article: Repository<Article>,
    @InjectRepository(Photo)
    private readonly photo: Repository<Photo>,
  ) {
    super(article);
  }

  getById(id: number): Promise<Article | ApiResponse> {
    return this.article.findOne(id);
  }

  async getAll(): Promise<Article[]> {
    let x = await this.article.find();

    let slike = await this.photo.find();
    x.forEach(element => {
      slike.forEach(slika => {
        if (slika.articleId == element.articleId) {
          element.imageUrl = slika.imagePath;
        }
      });
    });

    return x;
  }

  async add(data: AddArticleDto): Promise<Article | ApiResponse> {
    let newArticle: Article = new Article();
    newArticle.title = data.title;
    newArticle.description = data.description;

    return new Promise(resolve => {
      this.article
        .save(newArticle)
        .then(data => resolve(data))
        .catch(error => {
          const response: ApiResponse = new ApiResponse('error', -5001);
          resolve(response);
        });
    });
  }

  async editArticle(
    id: number,
    data: EditArticleDto,
  ): Promise<Article | ApiResponse> {
    let article: Article = await this.article.findOne(id);

    article.title = data.title;
    article.description = data.description;

    return this.article.save(article);
  }
}
