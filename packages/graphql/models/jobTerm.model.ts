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
import { User } from './user.model';

@Table({ version: true })
export class JobTerm extends Model<JobTerm> {
  @BelongsTo(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy;

  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;

  @Column
  order: number;

  @Column
  status: string;

  @Column
  latestVersion?: number;

  // job
  @Column
  @ForeignKey(() => Job)
  ref_id: number;

  @BelongsTo(() => Job)
  job: Job;

  // assignee
  @Column
  @ForeignKey(() => User)
  assignee_id: number;

  @BelongsTo(() => User)
  assignee: User;
}