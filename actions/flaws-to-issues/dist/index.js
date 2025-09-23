"use strict";

//
// entry point when called from a Workflow Action
//

var core = require('@actions/core');
var github = require('@actions/github');
var importFlaws = require('./importer').importFlaws;
try {
  // get input params
  var resultsFile = core.getInput('scan-results-json', {
    required: true
  });
  var token = core.getInput('github-token', {
    required: true
  });
  var waitTime = core.getInput('wait-time'); // default set in Action.yml
  var source_base_path_1 = core.getInput('source_base_path_1');
  var source_base_path_2 = core.getInput('source_base_path_2');
  var source_base_path_3 = core.getInput('source_base_path_3');
  var fail_build = core.getInput('fail_build');
  var debug = core.getInput('debug');
  var commit_hash = core.getInput('commitHash');
  if (commit_hash == "") {
    commit_hash = process.env.GITHUB_SHA;
  }
  console.log('resultsFile: ' + resultsFile + '\nwaitTime: ' + waitTime + '\nsource_base_path_1: ' + source_base_path_1 + '\nsource_base_path_2: ' + source_base_path_2 + '\nsource_base_path_3: ' + source_base_path_3 + '\ncommit_hash: ' + commit_hash + '\ndebug: ' + debug);
  var isPR;
  var owner;
  var repo;

  // other params
  if (core.getInput('repo_owner') && core.getInput('repo_name')) {
    owner = core.getInput('repo_owner');
    console.log('Owner: ' + core.getInput('repo_owner'));
    repo = core.getInput('repo_name');
    console.log('Repo: ' + core.getInput('repo_name'));
  } else {
    owner = github.context.repo.owner;
    repo = github.context.repo.repo;
  }
  console.log('owner = ' + owner);
  console.log('repo = ' + repo);
  if (core.getInput('repo_owner') && core.getInput('repo_name')) {
    isPR = 0;
  } else {
    core.info('check if we run on a pull request');
    var pullRequest = process.env.GITHUB_REF;
    if (debug == "true") {
      core.info('#### DEBUG START ####');
      core.info('index.js');
      core.info(pullRequest);
      core.info(JSON.stringify(process.env));
      core.info('#### DEBUG END ####');
    }
    var _isPR = pullRequest.indexOf("pull");
    var pr_context;
    var pr_commentID;
  }
  if (isPR >= 1) {
    core.info("This run is part of a PR, should add some PR links");
    pr_context = github.context;
    pr_commentID = pr_context.payload.pull_request.number;
  } else {
    if (debug == "true") {
      core.info('#### DEBUG START ####');
      core.info('index.js');
      core.info("isPR?: " + isPR);
      core.info('#### DEBUG END ####');
    }
    core.info("We don't run on a PR");
  }

  // do the thing
  importFlaws({
    resultsFile: resultsFile,
    githubOwner: owner,
    githubRepo: repo,
    githubToken: token,
    waitTime: waitTime,
    source_base_path_1: source_base_path_1,
    source_base_path_2: source_base_path_2,
    source_base_path_3: source_base_path_3,
    commit_hash: commit_hash,
    isPR: isPR,
    pr_commentID: pr_commentID,
    fail_build: fail_build,
    debug: debug
  })["catch"](function (error) {
    console.error("Failure at ".concat(error.stack));
  });
} catch (error) {
  core.setFailed(error.stack);
}