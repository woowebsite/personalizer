import {
  Table,
  Column,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { TermMeta } from './termMeta.model';
import { TermTaxonomy } from './termTaxonomy.model';

@Table({ timestamps: false })
export class Term extends Model<Term> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  slug: string;

  @Column
  term_group: number;

  @Column
  status: string;

  @HasMany(() => TermMeta)
  metadata: TermMeta[];

  @HasMany(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy[];
}
