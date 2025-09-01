import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const academyDB = new SQLDatabase("academy", {
  migrations: "./migrations",
});
