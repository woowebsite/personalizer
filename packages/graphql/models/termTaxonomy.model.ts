import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
} from 'sequelize-typescript';
import { Term } from './term.model';

@Table({ timestamps: false })
export class TermTaxonomy extends Model<TermTaxonomy> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  taxonomy: string;

  @Column(DataType.VIRTUAL)
  termName: string;

  @Column
  description: string;

  @Column
  slug: string;

  @Column
  parent: number;

  @Default(1)
  @Column
  order: number;

  @Column
  count: number;

  @BelongsTo(() => Term)
  term: Term;

  @ForeignKey(() => Term)
  @Column
  term_id: number;
}
