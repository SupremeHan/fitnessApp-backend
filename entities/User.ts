import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "fitness" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "lastname", length: 50, default: () => "'0'" })
  lastname: string;

  @Column("int", { name: "age", nullable: true, default: () => "'0'" })
  age: number | null;

  @Column("int", { name: "height", default: () => "'0'" })
  height: number;

  @Column("int", { name: "weight", default: () => "'0'" })
  weight: number;

  @Column("varchar", { name: "email", default: () => "'0'" })
  email: string;

  @Column("varchar", { name: "username", length: 64, default: () => "'0'" })
  username: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;
}
