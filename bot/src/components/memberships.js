var webex = require('webex/env');
var assert = require('assert');

function createWebexMembership(payload) {
  return webex.memberships.create(payload).catch(function (reason) {
    console.log(`create membership failed: ${reason}`);
  });
}
function updateWebexMembership(membership) {
  assert.equal(membership.isModerator, false);
  membership.isModerator = true;
  // console.log("MEMBERSHIP AFTER UPDATE")
  // console.log(membership)
  return webex.memberships.update(membership).catch(function (reason) {
    console.log(`update membership failed: ${reason}`);
  });
}

module.exports = { createWebexMembership, updateWebexMembership };
