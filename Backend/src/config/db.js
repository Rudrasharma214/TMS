import { Sequelize } from "sequelize";
import env from "./env.js";
import logger from "./logger.js";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: "mysql",
    port: Number(env.DB_PORT) || 3306,

    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    define: {
      underscored: true,
      timestamps: true,
    },

    dialectOptions: {
      charset: "utf8mb4",
      timezone: "+05:30",
    },
  }
);

export const connectDB = async () => {
  try {
    logger.info("Connecting to database...");
    await sequelize.authenticate();
    logger.info("Database connected");

    return true;
  } catch (err) {
    logger.error("Database connection failed");
    logger.error(err);
    process.exit(1);
  }
};

export const syncDB = async () => {
  try {
    await sequelize.sync({ alter: false });
    logger.info("Database synced");
  } catch (err) {
    logger.error("Sync failed");
    throw err;
  }
};

export const disconnectDB = async () => {
  try {
    await sequelize.close();
    logger.info("Database disconnected");
  } catch (err) {
    logger.error("Error while closing DB");
    logger.error(err);
  }
};
