import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from "../../config/config.service.js";

// إنشاء اتصال Sequelize
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: 3306,
});

export default sequelize;

// دالة للتحقق من الاتصال بالداتا بيز
export const checkDBconnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// دالة لمزامنة الموديلات مع الداتا بيز
export const syncDBconnection = async () => {
  try {
    await sequelize.sync({ alter: false, force: false}); // تعديل الجداول بدون مسح البيانات
    console.log("✅ Database sync has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to sync the database:", error);
  }
};
