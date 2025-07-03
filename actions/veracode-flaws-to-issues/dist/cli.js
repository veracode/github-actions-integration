"use strict";

//
// entry point when called via CLI (mostly for testing)
//

var program = require('commander');
var dotenv = require('dotenv');
var importFlaws = require('./importer').importFlaws;
dotenv.config();
var githubOwner = process.env.GITHUB_OWNER;
var githubRepo = process.env.GITHUB_REPO;
var githubToken = process.env.GITHUB_TOKEN;
var waitTime = process.env.WAIT_TIME;
program.version('0.0.1').requiredOption('-r, --results <path>', 'Scan results file to create issues from', 'filtered_results.json').option('-go, --github-owner <string>', 'GitHub owner name').option('-gr, --github-repo <string>', 'GitHub repo name').option('-t, --token <string>', 'GitHub auth token').option('-w, --wait-time <integer>', 'Seconds to wait between adding Issues to GitHub, for rate-limiting (default: 2 seconds)').parse();
try {
  var opts = program.opts();

  // cmd-line opts override env vars
  if (opts.githubOwner !== undefined) githubOwner = opts.githubOwner;
  if (opts.githubRepo !== undefined) githubRepo = opts.githubRepo;
  if (opts.githubToken !== undefined) githubToken = opts.githubToken;
  if (opts.waitTime !== undefined) waitTime = opts.waitTime;else if (waitTime === undefined) waitTime = 2;

  // do the thing
  importFlaws({
    resultsFile: opts['results'],
    githubOwner: githubOwner,
    githubRepo: githubRepo,
    githubToken: githubToken,
    waitTime: waitTime
  })["catch"](function (error) {
    console.error("Failure at ".concat(error.stack));
  });
} catch (error) {
  console.error(error.stack);
}