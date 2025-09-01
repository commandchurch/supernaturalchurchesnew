import { SQLDatabase } from "encore.dev/storage/sqldb";

export const staffDB = new SQLDatabase("staff", {
  migrations: "./migrations",
});
