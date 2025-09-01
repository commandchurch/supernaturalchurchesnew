import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const churchDB = new SQLDatabase("church", {
  migrations: "./migrations",
});
