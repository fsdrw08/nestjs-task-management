/*
For every class sub-object decorate by "class-validator",
we can binding ValidationPipe at the application level,
thus ensuring all endpoints are protected from receiving incorrect data.
https://docs.nestjs.com/techniques/validation#auto-validation
*/
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
