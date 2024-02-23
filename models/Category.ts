import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  { tableName: "Categories" }
);

export default Category;
