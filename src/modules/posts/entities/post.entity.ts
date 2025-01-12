import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "boolean", default: false })
  is_edited: boolean;

  @Column({ type: "boolean", default: false })
  is_published: boolean;

  @Column({ type: "boolean", default: false })
  is_destroyed: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
