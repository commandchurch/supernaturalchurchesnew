import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const partnershipDB = new SQLDatabase("partnership", {
  migrations: "./migrations",
});
