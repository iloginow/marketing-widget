import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

class Parser {
  constructor(ctx) {
    this.logger = ctx.logger;
    this.filePath = ctx.filePath;
    this.records = [];
    this.lineCount = 0;
  }

  async parseCSV() {
    try {
      const input = await this.getReadStream();
      const rl = createInterface({ input, crlfDelay: Infinity });
      rl.on('line', (line) => this.handleNewLine(line));
      return new Promise((resolve) => {
        rl.once('close', () => resolve(this.records));
      });
    } catch (err) {
      this.handleFatalError(err);
      return this.records;
    }
  }

  getReadStream() {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(this.filePath);
      readStream.once('open', () => resolve(readStream));
      readStream.once('error', (err) => reject(err));
    });
  }

  handleNewLine(line) {
    if (this.lineCount === 0) {
      this.lineCount += 1;
    } else {
      this.createRecord(line);
      this.lineCount += 1;
    }
  }

  createRecord(line) {
    const row = line.split(',');
    if (!row?.length || row.length < 10) {
      this.logger.error(`Invalid row ${line}`);
      return;
    }
    const record = {
      age: row[0],
      gender: row[1],
      home: row[2],
      married: row[3],
      location: row[4],
      salary: parseInt(row[5], 10),
      children: parseInt(row[6], 10),
      history: row[7],
      catalogs: parseInt(row[8], 10),
      spent: parseInt(row[9], 10),
    };
    this.records.push(record);
  }

  handleFatalError(err) {
    this.logger.error(err);
    process.exit(1);
  }
}

export default Parser;
