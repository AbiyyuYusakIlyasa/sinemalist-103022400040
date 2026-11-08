import { IsBoolean } from 'class-validator';

export class UpdateFilmDto {
  @IsBoolean()
  sudahDitonton: boolean;
}