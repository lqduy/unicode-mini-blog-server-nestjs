import { Controller, Delete, Get, Param } from "@nestjs/common";

import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tagsService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tagsService.remove(+id);
  }
}
