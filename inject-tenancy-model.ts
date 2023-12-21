import { Inject } from '@nestjs/common';
import { TenancyModelFactory } from './tenancy-model.factory';
import { Model } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { ITenantDocument } from './tenant-document.base.interface';

export function InjectTenancyModel<T extends ITenantDocument>(
  modelName: string,
) {
  return (target: Object, key: string | symbol) => {
    Inject(TenancyModelFactory)(target, 'tenancyModelFactory');
    Inject(getConnectionToken())(target, 'connection');

    Object.defineProperty(target, key, {
      get: function () {
        return this.tenancyModelFactory.getModel(
          this.connection,
          modelName,
        ) as Model<T>;
      },
    });
  };
}
