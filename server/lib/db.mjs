import { ServerApiVersion, MongoClient } from 'mongodb';

class DB {
  constructor(ctx) {
    this.connectionString = ctx.connectionString;
    this.logger = ctx.logger;
    this.client = this.getClient();
    this.admin = this.client.db('admin');
    this.data = this.client.db('data');
  }

  getClient() {
    if (!this.connectionString) {
      this.logger.error('MongoDB connection string not found');
      process.exit(1);
    }
    return new MongoClient(this.connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: false,
      },
    });
  }

  async verifyConnection() {
    try {
      await this.admin.command({ ping: 1 });
      this.logger.info('Connected to MongoDB');
    } catch (err) {
      this.logger.error('Failed to connect to MongoDB');
      process.exit(1);
    }
  }

  closeConnection() {
    this.client.close();
  }

  async countRecords() {
    const records = this.data.collection('records');
    return records.estimatedDocumentCount();
  }

  async bulkInsertData(docs) {
    const records = this.data.collection('records');
    const options = { ordered: true };
    try {
      const result = await records.insertMany(docs, options);
      if (result.insertedCount < docs.length) {
        const missedCount = docs.length - result.insertedCount;
        throw new Error(`Failed to insert ${missedCount} out of ${docs.length} records`);
      }
      this.logger.info(`Inserted ${result.insertedCount} new records`);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getDistinctValuesForParam(param) {
    const records = this.data.collection('records');
    return records.distinct(param);
  }

  async aggregateRecords(pipeline) {
    if (!pipeline?.length) {
      this.logger.error('Invalid aggregate query');
      return [];
    }

    const records = this.data.collection('records');

    try {
      const cursor = records.aggregate(pipeline);
      return cursor.toArray();
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }

  async getAvgSpentAmountsByParam(param) {
    const pipeline = [
      {
        $group: {
          _id: `$${param}`,
          avgSpent: { $avg: { $divide: ['$spent', '$catalogs'] } },
        },
      },
    ];
    return this.aggregateRecords(pipeline);
  }

  async getAvgSpentAmountsBySalaryRange(buckets) {
    const pipeline = [
      {
        $bucketAuto: {
          groupBy: '$salary',
          buckets,
          output: {
            avgSpent: { $avg: { $divide: ['$spent', '$catalogs'] } },
          },
        },
      },
    ];
    return this.aggregateRecords(pipeline);
  }
}

export default DB;
