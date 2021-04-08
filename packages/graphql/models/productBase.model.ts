import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { Provider } from './provider.model';
import { Image } from './image.model';
import { ProductBaseImage } from './productbaseimage.model';
import { ProductBaseTag } from './productbasetag.model';

@Table({ timestamps: true })
export class ProductBase extends Model<ProductBase> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;
 
  @Column
  primaryImageUrl: string;

  @Column
  visibility: string;

  @Column
  publishDate: Date;

  // Reference ================================
  // tags
  @BelongsToMany(() => ProductBaseTag, () => Tag)
  tags: ProductBaseTag[];

  // images
  @BelongsToMany(() => ProductBaseImage, () => Image)
  images: ProductBaseImage[];

  // primary image
  // @ForeignKey(() => Image)
  // @Column
  // primaryImageId: number;

  // @BelongsTo(() => Image)
  // primaryImage: Image;

  // category
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  // provider
  @ForeignKey(() => Provider)
  @Column
  providerId: number;

  @BelongsTo(() => Provider)
  provider: Provider;

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
