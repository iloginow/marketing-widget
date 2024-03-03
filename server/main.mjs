import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import Logger from './lib/logger.mjs';
import DB from './lib/db.mjs';
import OverviewService from './lib/overview.mjs';

const connectionString = process.env.MONGO_URL;
const port = process.env.EXPRESS_PORT || 8080;

const logger = new Logger({ name: 'Express' });

const db = new DB({ connectionString, logger: new Logger({ name: 'DB' }) });
await db.verifyConnection();

const overviewService = new OverviewService({ db, logger: new Logger({ name: 'OverviewService' }) });

const app = express();

function logRequest(req, _, next) {
  logger.logHttpRequest(req.method, req.url);
  next();
}

app.use(logRequest);
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

app.get('/overview', async (_, res) => {
  try {
    const overview = await overviewService.getOverview();
    res.status(200).json(overview).send();
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' }).send();
  }
});

app.listen(port, () => logger.info(`Express app is listening on port ${port}`));
