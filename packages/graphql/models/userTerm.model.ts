import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { TermTaxonomy } from './termTaxonomy.model';
import { User } from './user.model';

@Table({ version: true })
export class UserTerm extends Model<UserTerm> {
  @Column
  order: number;

  @Column
  money: number;

  @Column
  status: string;

  @Column
  latestVersion?: number;

  // user
  @Column
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  // taxonomy
  @BelongsTo(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy;

  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;
}
