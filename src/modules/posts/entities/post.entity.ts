import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "@src/modules/users/entities/user.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column({ type: "boolean", default: false })
  is_edited: boolean;

  @Column({ type: "boolean", default: false })
  is_published: boolean;

  @Column({ type: "boolean", default: false })
  is_destroyed: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
