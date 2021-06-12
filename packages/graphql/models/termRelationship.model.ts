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
import { Term } from './term.model';
import { ProductBase } from './productBase.model';
import { TermTaxonomy } from './termTaxonomy.model';

@Table({ timestamps: false })
export class TermRelationship extends Model<TermRelationship> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  entityType: string;

  @Default(1)
  @Column
  orderBy: number;

  @Column
  entityId: number;

  @ForeignKey(() => TermTaxonomy)
  @Column
  taxonomyId: number;

  @BelongsTo(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy;
}
