import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Post } from "@src/modules/posts/entities/post.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "int" })
  role_id: number;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  avatar_url: string;

  @Column({ type: "boolean", default: false })
  is_verified: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
