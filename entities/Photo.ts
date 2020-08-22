import { PrimaryGeneratedColumn, Column, JoinColumn, Index, Entity } from "typeorm";
import { Article } from "./Article";

@Index("fk_photo_article_id", ["articleId"], {})
@Entity("photo", {schema: "fitness"})
export class Photo {
    @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
    photoId: number;

    @Column("varchar", {
        name: "image_path",
        unique: true,
        length: 128,
        default: () => "'0'",
      })
      imagePath: string;

    @Column("int", {name: "article_id", unsigned: true, default: () => "'0'"})
    articleId: number;

    @JoinColumn([{name: "article_id", referencedColumnName: "articleId"}])
    article: Article
    
}