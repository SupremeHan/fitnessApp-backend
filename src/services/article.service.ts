import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Article } from "entities/Article";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/misc/api.response";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { resolve } from "path";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor(@InjectRepository(Article)
                private readonly article: Repository<Article>) {
                    super(article);
                }

    getAll(): Promise<Article[]> {
        return this.article.find();
    }

    add(data: AddArticleDto): Promise<Article | ApiResponse> {
        let newArticle: Article = new Article();
        newArticle.title = data.title;
        newArticle.description = data.description

        return new Promise((resolve) => {
            this.article.save(newArticle)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -5001);
                resolve(response);
            });
        })
    }
}