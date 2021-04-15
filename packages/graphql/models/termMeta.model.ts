import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Term } from './term.model';

@Table({ timestamps: false })
export class TermMeta extends Model<TermMeta> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  key: string;

  @Column
  value: string;

  @ForeignKey(() => Term)
  @Column
  term_id: number;

  @BelongsTo(() => Term)
  term: Term;
}
