import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  BeforeValidate,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Roles } from "./role.model";
import { Permission } from "./permission.model";

@Table({ tableName: "RolePermisson", timestamps: true, paranoid: true })
export class RolePermisson extends Model<RolePermisson> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  rpid!: number;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleid!: number;
  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  permissionid!: number;
  @CreatedAt
  @Column({
    field: "createdAt",
  })
  createdAt?: Date;
  @UpdatedAt
  @Column({
    field: "updatedAt",
  })
  updatedAt?: Date;

  //   @HasMany(() => Product)
  //   products!;:Product[]
}
