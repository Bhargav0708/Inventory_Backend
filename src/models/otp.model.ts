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
} from "sequelize-typescript";

@Table({ tableName: "Otps", timestamps: true, paranoid: true })
export class OTP extends Model<OTP> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  otp!: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  email!: string;

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
}
