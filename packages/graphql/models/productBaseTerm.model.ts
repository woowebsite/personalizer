import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductBase } from './productBase.model';
import { Term } from './term.model';
import { TermTaxonomy } from './termTaxonomy.model';

@Table({ timestamps: false })
export class ProductBaseTerm extends Model<ProductBaseTerm> {
  @Column
  order: number;

  // ProductBase
  @Column
  @ForeignKey(() => ProductBase)
  ref_id: number;

  @BelongsTo(() => ProductBase)
  productBase: ProductBase;

  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;

  @BelongsTo(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy;
}
