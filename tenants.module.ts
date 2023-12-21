import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenants, TenantSchema } from './entities/tenant.entity';
import { TenantMiddleware } from './tenant.middleware';
import { TenancyModelFactory } from './tenancy-model.factory';
import { RequestContext } from './request-context';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenants.name, schema: TenantSchema }]),
  ],
  providers: [TenantsService, RequestContext, TenancyModelFactory],
  controllers: [TenantsController],
  exports: [RequestContext, TenancyModelFactory],
})
export class TenantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
