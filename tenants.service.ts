import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TenantDocument, Tenants } from './entities/tenant.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { CreateTenantDto } from './dto/create.dto';

@Injectable()
export class TenantsService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Tenants.name)
    private readonly TenantModule: Model<TenantDocument>,
  ) {}

  async createTenant(createTenantDto: CreateTenantDto): Promise<Tenants> {
    try {
      const tenant = await this.TenantModule.create(createTenantDto);
      return tenant;
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async getTenantByTenantId(tenantId: string): Promise<Tenants> {
    const tenant = await this.TenantModule.findOne({ tenantId });
    if (!tenant) throw new NotFoundException('Tenant not exists.');
    return tenant;
  }
}
