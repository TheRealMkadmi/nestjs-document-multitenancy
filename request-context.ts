import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class RequestContext<T> {
  tenantId: string;
  proxies = new Map<string, Model<T>>();

  getTenantId() {
    return this.tenantId;
  }
}
