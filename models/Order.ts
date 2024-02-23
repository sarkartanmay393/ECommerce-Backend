import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "placed",
    }, // statuses: placed, shipped, delivered
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
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
  { tableName: "Orders" }
);

export default Order;
