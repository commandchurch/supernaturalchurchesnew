import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const outreachDB = new SQLDatabase("outreach", {
  migrations: "./migrations",
});
