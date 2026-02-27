import 'dotenv/config';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export const postgresContainer = new PostgreSqlContainer()
  .withDatabase(process.env.DB_NAME || 'pokemon')
  .withUsername(process.env.DB_USERNAME || 'admin')
  .withPassword(process.env.DB_PASSWORD || 'admin')
  .withExposedPorts({
    container: 5432,
    host: parseInt(process.env.DB_PORT || '5432', 10),
  })
  .withReuse();

export const startDatabase = async () => {
  const theContainer = await postgresContainer.start();
  process.on('SIGINT', async function () {
    await theContainer.stop();
    process.exit();
  });
};
