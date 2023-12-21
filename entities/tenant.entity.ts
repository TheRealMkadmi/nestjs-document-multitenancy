import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Builder } from 'apps/dashboard-api/src/modules/builder/schemas/builder.schema';
import { User } from 'libs/common';
import mongoose, { Document } from 'mongoose';

export type TenantDocument = Tenants & Document;

@Schema({ timestamps: true })
export class Tenants {
  @Prop()
  tenantId: string;

  @Prop()
  domain: string;

  @Prop()
  jwtSecret: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Builder' })
  user: User;
}

export const TenantSchema = SchemaFactory.createForClass(Tenants);
