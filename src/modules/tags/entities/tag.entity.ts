import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { Post } from "@src/modules/posts/entities/post.entity";

@Entity("tags")
export class Tag {
  @PrimaryColumn({ type: "varchar", length: 100 })
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable({
    name: "post_tags",
    joinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
  })
  posts: Post[];
}
