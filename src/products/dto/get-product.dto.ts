import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { MainPagingDTO } from 'src/common/dto/main-paging.dto';

export class GetProductDTO extends MainPagingDTO {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_active: boolean;
}
