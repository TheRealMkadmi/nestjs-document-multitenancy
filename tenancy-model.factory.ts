import { Inject, Injectable, Scope } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { RequestContext } from './request-context';
import { ITenantDocument } from './tenant-document.base.interface';

@Injectable({ scope: Scope.REQUEST })
export class TenancyModelFactory {
  constructor(
    @Inject(RequestContext)
    private requestContext: RequestContext<ITenantDocument>,
  ) {}

  getModel<T extends ITenantDocument>(
    connection: Connection,
    modelName: string,
  ): Model<T> {
    const model = connection.model<T>(modelName);
    const proxiedModel = this.createProxy(model);
    return proxiedModel as Model<T>;
  }

  private createProxy<T extends ITenantDocument>(model: Model<T>): Model<T> {
    return new Proxy(model, {
      get: (target, propertyName: string) => {
        if (typeof target[propertyName] === 'function') {
          return (...args: any[]) => {
            switch (propertyName) {
              case 'find':
              case 'findOne':
              case 'updateOne':
              case 'updateMany':
              case 'deleteOne':
              case 'deleteMany':
                args[0] = {
                  ...args[0],
                  tenantId: this.requestContext.tenantId,
                };

                console.log(args);

                break;
              case 'countDocuments':
                args.length === 0
                  ? args.push({ tenantId: this.requestContext.tenantId })
                  : (args[0] = {
                      ...args[0],
                      tenantId: this.requestContext.tenantId,
                    });
                break;
              default:
                console.log(propertyName, args);
            }

            return target[propertyName](...args);
          };
        }
        return target[propertyName];
      },
    });
  }
}
