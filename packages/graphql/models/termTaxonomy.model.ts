import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { UserTerm } from './userTerm.model';
import { JobTerm } from './jobTerm.model';
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

  // foreign 
  @HasMany(() => JobTerm)
  jobTerms: JobTerm[];
  
  @HasMany(() => UserTerm)
  userTerms: UserTerm[];
}
