import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    cartId: {
      type: DataTypes.INTEGER,
      references: { model: "Carts", key: "id" },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: "Products", key: "id" },
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
  { tableName: "CartItems" }
);

export default CartItem;
