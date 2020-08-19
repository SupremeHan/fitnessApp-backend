import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article", { schema: "fitness" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column("varchar", { name: "title", length: 50, default: () => "'0'" })
  title: string;

  @Column("varchar", { name: "photo_path", length: 128 })
  photoPath: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;
}
