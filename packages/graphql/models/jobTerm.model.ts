import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { Job } from './job.model';
import { TermTaxonomy } from './termTaxonomy.model';

@Table({ timestamps: false })
export class JobTerm extends Model<JobTerm> {
  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;

  @Column
  order: number;

  @Column
  @ForeignKey(() => Job)
  ref_id: number;
}
