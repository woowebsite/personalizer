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
  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;

  @Column
  order: number;

  @Column
  @ForeignKey(() => ProductBase)
  ref_id: number;
}
