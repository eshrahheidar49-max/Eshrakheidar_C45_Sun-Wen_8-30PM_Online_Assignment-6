export const users =[]

import { DataTypes } from "sequelize";
import {sequelize} from "../connection.db.js";

export const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be longer than 6 characters");
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate(user) {
        if (user.name.length <= 2) {
          throw new Error("Name length must be greater than 2");
        }
      },
    },
  }
);
