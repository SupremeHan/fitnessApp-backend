import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_admin_username", ["username"], { unique: true })
@Entity("admin", { schema: "fitness" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", {
    name: "username",
    unique: true,
    length: 64,
    default: () => "'0'",
  })
  username: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;
}
