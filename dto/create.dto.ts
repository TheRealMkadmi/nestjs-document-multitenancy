import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  tenantId: string;

  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @IsString()
  jwtSecret: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;
}
