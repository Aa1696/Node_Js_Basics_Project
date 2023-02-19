'use strict';

const http = require('http');

const test = require('tape');
const Gofer = require('gofer');
const Bluebird = require('bluebird'),
      async = Bluebird.coroutine;
const createApp = require('quinn'),
      respond = createApp.respond;

const parsedBody = require('../json');

let __handler = function(req) { throw new Error('No handler'); };
const testAppUrl = new Bluebird(function(resolve, reject) {
  const server = http.createServer(function(req, res) {
    (createApp(__handler)(req, res)).then(null, function(error) {
      console.error(error.stack);
    });
  }).listen(0, function() {
    resolve('http://127.0.0.1:' + server.address().port);
  }).on('error', reject);
  server.unref();
});
const getTestApp = async(function *(handler) {
  __handler = handler;
  return new Gofer({ globalDefaults: { baseUrl: yield testAppUrl } });
});

test('Parses valid json', async(function *(t) {
  const client = yield getTestApp(async(function *(req) {
    const body = yield parsedBody(req);
    return respond.json({ ok: true, body: body });
  }));
  const data = yield client.post('/', { json: { a: 'b' } });
  t.deepEqual(data, { ok: true, body: { a: 'b' } });
  t.end();
}));

test('Rejects invalid json', async(function *(t) {
  const client = yield getTestApp(async(function *(req) {
    try {
      yield parsedBody(req);
    } catch (err) {
      return respond.json({
        type: err.name,
        message: err.message,
        raw: err.raw
      });
    }
  }));
  const data = yield client.post('/', { body: '{"not json' });
  t.deepEqual(data, {
    type: 'SyntaxError',
    message: 'Unexpected token n',
    raw: '{"not json'
  });
  t.end();
}));

test('Honors content-length', async(function *(t) {
  let parseError;
  const client = yield getTestApp(async(function *(req) {
    try {
      yield parsedBody(req);
    } catch (err) {
      parseError = err;
    }
  }));
  try {
    yield client.post('/', {
      body: '{}',
      headers: { 'Content-Length': 1 }
    });
  } catch (e) {
    t.equal(e.code, 'ECONNRESET',
      'Connection reset because body could not be written');
  }
  t.equal(parseError.name, 'SyntaxError');
  t.equal(parseError.message, 'Unexpected end of input');
  t.end();
}));
