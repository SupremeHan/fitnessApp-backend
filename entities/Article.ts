import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Photo } from "./Photo";

@Entity("article", { schema: "fitness" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column("varchar", { name: "title", length: 50, default: () => "'0'" })
  title: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Photo, (photo) => photo.article)
  photo: Photo[];
}
