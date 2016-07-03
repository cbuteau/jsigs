var path  = require('path');
var http  = require('http');
var fs    = require('fs');
var cp    = require('child_process');
var shell = require('shelljs');
var port  = 7358;
var server;

module.exports = {
  test_page: 'testem-coverage.html',
  launch_in_dev: ['chrome', 'firefox'],
  serve_files: [
    'instrument/*.js'
  ],
  src_files: [
    'jsigs.js',
    'tests/*.js'
  ],

  // proxy to the create http server
  // phantomjs has problems with POSTs to different port
  "proxies": {
    "/coverage": {
      "target": "http://localhost:7358"
    }
  },

  // instrument files, spin up http server to write coverage data to disk
  before_tests: function(config, data, callback)
  {
    // only do the coverage in ci mode.
    if (config.appMode === 'dev') {
      config.fileOptions.serve_files[0] = 'jsigs.js';
      return;
    }

    shell.exec('node ./node_modules/istanbul/lib/cli.js instrument jsigs.js --output instrument/jsigs.js', function(code, output)
    {
      if (code) {
        callback(code, output);
        return;
      }

      // if instrumented successfully
      // start the server
      server = http.createServer(function(req, res) {
        console.error('... Received coverage of', req.headers['content-length'], 'length');
        // need separate files per browser/client
        req.pipe(fs.createWriteStream(path.join(__dirname, 'coverage_web', 'coverage.json'))); // + Math.random() + '.json')));
        // make sure we've got it all
        req.on('end', res.end.bind(res));
      }).listen(port, function(serverErr) {
        console.error('------ Listening for coverage on ' + port);
        // when server is ready
        // pass control back to testem
        callback(serverErr);
      });
    });
  },

  // after tests done, stop http server, combined coverage data into the report
  after_tests: function(config, data, callback)
  {
    if (config.appMode === 'dev') {
      return;
    }

    // shutdown teh server
    server.close();

    // generate report
    shell.exec('node ./node_modules/istanbul/lib/cli.js report --include coverage/coverage.json', function(code, output) {
      if (code) return callback(code, output);

      // check on generated report
      var lcov = shell.grep('end_of_record', path.join(__dirname, 'coverage/lcov.info'));
      var report = shell.grep('index.html', path.join(__dirname, 'coverage/lcov-report/index.html'));

      if (!lcov || !report) {
        callback(new Error('Unable to generate report'));
        return;
      }

      // everything is good
      callback(null);
    });
  },
}
