import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  HasOne,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import StatusType from '../constants/StatusType';
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

  @Default(StatusType.Actived)
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
  assignee_id?: number;

  @BelongsTo(() => User)
  assignee: User;
}
