import { Document } from 'mongoose';

export interface ITenantDocument extends Document {
  tenantId: string;
}
