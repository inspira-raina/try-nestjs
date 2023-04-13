import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  order_number: string;

  @IsNotEmpty()
  user_id: number;
}
