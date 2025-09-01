import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const fundDB = new SQLDatabase("fund", {
  migrations: "./migrations",
});
