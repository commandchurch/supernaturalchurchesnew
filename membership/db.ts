import { SQLDatabase } from "encore.dev/storage/sqldb";

export const membershipDB = new SQLDatabase("membership", {
  migrations: "./migrations",
});
