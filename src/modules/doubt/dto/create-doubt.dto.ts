import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { User } from '../../user/schema/user.schema';

export class CreateDoubtDto {
  readonly tags: string[];

  @IsMongoId()
  readonly asked_by: User;

  readonly answers: string[];

  @IsBoolean()
  @IsOptional()
  readonly request_mentor: boolean;
}
