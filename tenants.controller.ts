import { Body, Controller, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create.dto';

@Controller('tenant')
export class TenantsController {
  constructor(private readonly tenantService: TenantsService) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantService.createTenant(createTenantDto);
  }
}
