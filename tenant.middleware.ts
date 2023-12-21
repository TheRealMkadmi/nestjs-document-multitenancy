import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from './request-context';
import { ITenantDocument } from './tenant-document.base.interface';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  tenantDefultName: string = process.env.TENANT_DEFAULT_NAME;
  constructor(
    private readonly requestContext: RequestContext<ITenantDocument>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tenantId =
      (req.headers['x-tenant-id'] as string) || process.env.tenantId;

    // Can't pass without tenantId
    if (!tenantId) throw new BadRequestException('No tenant id provided.');

    this.requestContext.tenantId = tenantId;
    next();
  }
}
