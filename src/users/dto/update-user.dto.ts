import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: "You should inform the user id!" })
  userId: number
}
