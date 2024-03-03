import chalk from 'chalk';
import loglevel from 'loglevel';
import loglevelPluginPrefix from 'loglevel-plugin-prefix';

/**
 * Chalk colors.
 */
const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

/**
 * Prefix template
 * 2022-06-16T15:14:58.210Z INFO [SomeModule]: Message
 */
const template = '%t %l %n';

/**
 * Prefix for TRACE, DEBUG, INFO, WARN.
 * Colors: GREEN, YELLOW.
 */
const normalPrefixSetup = {
  template,
  levelFormatter(level) {
    return colors[level.toUpperCase()](level.toUpperCase());
  },
  nameFormatter(name) {
    return chalk.green(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};

/**
 * Prefix for ERROR
 * Colors: RED, YELLOW.
 */
const errorPrefixSetup = {
  template,
  levelFormatter(level) {
    return chalk.red(level.toUpperCase());
  },
  nameFormatter(name) {
    return chalk.yellow(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};

/**
 * Prefix for HTTP-REQuEST.
 * Colors: GREEN, YELLOW.
 */
const httpRequestPrefixSetup = {
  template: `%t ${chalk.blue('HTTP-REQUEST')} %n`,
  nameFormatter(name) {
    return chalk.green(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};

/**
 * Class representing a Logger.
 */
class Logger {
  /**
   * Create a new `Logger`.
   * Initialize a loglevel instance and the plugins.
   *
   * @param {Object} [ctx] Execution context
   * @param {String} [ctx.name] Module name
   */
  constructor(ctx = {}) {
    this.name = ctx.name;
    this.loglevel = loglevel;
    this.loglevel.enableAll();
    this.loglevelPluginPrefix = this.getLoglevelPluginPrefix();
  }

  /**
   * Initialize the loglevel prefix plugin,
   * bind it to the loglevel instance.
   *
   * @return {Object} A loglevel prefix plugin instance
   * @private
   */
  getLoglevelPluginPrefix() {
    loglevelPluginPrefix.reg(this.loglevel);
    loglevelPluginPrefix.apply(this.loglevel, normalPrefixSetup);
    return loglevelPluginPrefix;
  }

  /**
   * Create a DEBUG log record
   *
   * @param {String[]} [params] Any data to log to the console
   * @public
   */
  debug(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.debug(...params);
  }

  /**
   * Create a DEBUG log record (an alias for debug)
   *
   * @param {String[]} [params] Any data to log to the console
   * @public
   */
  log(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.log(...params);
  }

  /**
   * Create an HTTP-REQUEST log record
   *
   * @param {String} [method] An http method (GET, POST, PUT, DELETE etc...)
   * @param {String} [url] A particular URL being called by the http request
   * @param {String} [body] Request body if present
   * @public
   */
  logHttpRequest(method, url, body = null) {
    const logger = this.loglevel.getLogger(this.name);
    const payload = body && typeof body === 'object' ? JSON.stringify(body) : '';
    loglevelPluginPrefix.apply(logger, httpRequestPrefixSetup);
    logger.log(`${method} ${url} ${payload}`);
  }

  /**
   * Create an INFO log record
   *
   * @param {String[]} [params] Any data to log to the console
   * @public
   */
  info(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.info(...params);
  }

  /**
   * Create a WARN log record
   *
   * @param {String[]} [params] Any data to log to the console
   * @public
   */
  warn(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.warn(...params);
  }

  /**
   * Create an ERROR log record
   *
   * @param {String[]} [params] Any data to log to the console
   * @public
   */
  error(...params) {
    const logger = this.loglevel.getLogger(this.name);
    loglevelPluginPrefix.apply(logger, errorPrefixSetup);
    logger.error(...params);
  }
}

export default Logger;
