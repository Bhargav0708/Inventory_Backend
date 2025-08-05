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
  BelongsToMany,
} from "sequelize-typescript";
import { Permission } from "./permission.model";
import { RolePermisson } from "./rolepermission.model";
import { User } from "./user.model";
import { userRole } from "./userRole.model";

@Table({ tableName: "Roles", timestamps: true, paranoid: true })
export class Roles extends Model<Roles> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  roleid!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role_name!: string;
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

  @BelongsToMany(() => User, () => userRole)
  Users!: User[];
  @BelongsToMany(() => Permission, () => RolePermisson)
  Permissions!: Permission[];

  //   @HasMany(() => Product)
  //   products!;:Product[]
}
