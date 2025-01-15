import { IsString } from "class-validator";

export class BaseTagDto {
  @IsString()
  name: string;
}
