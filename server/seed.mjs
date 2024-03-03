import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Logger from './lib/logger.mjs';
import DB from './lib/db.mjs';
import Parser from './lib/parser.mjs';

const connectionString = process.env.MONGO_URL;

const logger = new Logger({ name: 'Seed' });

const db = new DB({ connectionString, logger: new Logger({ name: 'DB' }) });
await db.verifyConnection();

const recordCount = await db.countRecords();

if (recordCount > 0) {
  logger.info('The database is not empty. Skipping data set seed.');
  process.exit(0);
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(currentDir, '../dataset.csv');

const parser = new Parser({ filePath, logger: new Logger({ name: 'Parser' }) });

const data = await parser.parseCSV();

await db.bulkInsertData(data);
db.closeConnection();
