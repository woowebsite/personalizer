import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  Default,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Image } from './image.model';
import { ProductBaseImage } from './productbaseimage.model';
import StatusType from '../constants/StatusType';
import { ProductBaseMeta } from './productBaseMeta.model';
import { TermRelationship } from './termRelationship.model';

@Table({ timestamps: true })
export class ProductBase extends Model<ProductBase> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Default(StatusType.Actived)
  @Column
  status: string;

  @Column
  primaryImageUrl: string;

  @Column
  providerId: string;

  @Column
  visibility: string;

  @Column
  publishDate: Date;

  // Reference ================================
  // images
  @BelongsToMany(() => ProductBaseImage, () => Image)
  images: ProductBaseImage[];

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ProductBaseMeta)
  metadata: ProductBaseMeta[];

  @HasMany(() => TermRelationship)
  termRelationships: TermRelationship[];
  // Metadata ==================================

  // Virtual taxonomies ========================
  @Column(DataType.VIRTUAL)
  productbase_category: any;

  @Column(DataType.VIRTUAL)
  productbase_tag: any;
}
