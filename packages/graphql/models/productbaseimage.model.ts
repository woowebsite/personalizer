import {
  Table,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductBase } from './productBase.model';
import { Image } from './image.model';

@Table({ timestamps: true })
export class ProductBaseImage extends Model<ProductBaseImage> {
  @ForeignKey(() => ProductBase)
  @Column
  productBaseId: number;
  
  @ForeignKey(() => Image)
  @Column
  imageId: number;
}
