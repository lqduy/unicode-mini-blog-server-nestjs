import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { generateUUID } from "@src/utils/common";

import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>
  ) {}

  async createOne(tagName: string) {
    const existingTag = await this.tagsRepository.findOne({
      where: { name: tagName },
    });

    if (existingTag) {
      return { existingTag, createdTag: null };
    }

    const newTag = this.tagsRepository.create({
      name: tagName,
      id: generateUUID(),
    });
    const createdTag = await this.tagsRepository.save(newTag);
    return { existingTag: null, createdTag };
  }

  async createMany(tagNames: string[]) {
    const existingTags = await this.tagsRepository.find({
      where: { name: In(tagNames) },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);

    const tagsToCreate = tagNames.filter(
      (tag) => !existingTagNames.includes(tag)
    );

    const newTags = tagsToCreate.map((tagName) =>
      this.tagsRepository.create({ id: generateUUID(), name: tagName })
    );
    const createdTags = await this.tagsRepository.save(newTags);

    return { existingTags, createdTags };
  }

  findAll() {
    return "This action returns all tags";
  }

  findOne(id: string) {
    return this.tagsRepository.findOne({ where: { id } });
  }

  findMany(ids: string[]) {
    return this.tagsRepository.find({ where: { id: In(ids) } });
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
