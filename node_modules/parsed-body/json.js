'use strict';

const getRawBody = require('raw-body');

function withOptions(options) {
  options = options || {};
  const limit = options.limit || '1mb';

  function parse(raw) {
    const str = raw.toString('utf8');
    try {
      return JSON.parse(str);
    } catch (parseError) {
      parseError.raw = str;
      return Promise.reject(parseError);
    }
  }

  function parseJsonBody(req) {
    const opts = { limit: limit };
    const length = req.headers['content-length'] | 0;
    if (length) options.length = length;

    return getRawBody(req, opts).then(parse);
  }

  return parseJsonBody;
}

const withDefaultOpions = withOptions();

module.exports = withDefaultOpions;
withDefaultOpions['default'] = withDefaultOpions;
withDefaultOpions.withOptions = withOptions;
