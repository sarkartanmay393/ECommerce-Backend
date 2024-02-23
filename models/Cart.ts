import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { tableName: "Carts" }
);

export default Cart;
