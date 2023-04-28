require('dotenv').config();
var webex = require('webex/env');
let { sendMainCard, sendWebexMessage } = require('./messages.js');
let { formSubmitted } = require('./formSubmit.js');

var botId;
var botEmail;
function botSetup() {
  webex.people
    .get('me')
    .then(function (person) {
      botId = person.id;
      botEmail = person.emails[0];
      console.log(`Saving BotId:${botId}`);
    })
    .catch(function (reason) {
      console.error(reason);
      process.exit(1);
    });
}

function killSpace(roomId, personEmail) {
  console.log('---- Exit Card ----');
  webex.memberships.list({ roomId: roomId }).then(async function (memberships) {
    for (var i = 0; i < memberships.length; i += 1) {
      if (memberships.items[i].isModerator === true && memberships.items[i].personEmail === personEmail) {
        webex.rooms.remove(roomId).catch(function (reason) {
          console.log('delete rooms failed  - ', reason);
        });
      } else if (memberships.items[i].isModerator != true && memberships.items[i].personEmail === personEmail) {
        sendWebexMessage(roomId, `Only **moderators** can perform this action`);
      } else {
        continue;
      }
    }
  });
}

function eventListener() {
  console.log('connected');
  webex.messages
    .listen()
    .then(() => {
      console.log('listening to message events');
      webex.messages.on('created', (message) => {
        if (message.actorId != botId) {
          console.log('message created event:');
          console.log(message);
          let roomId = message.data.roomId;
          let personEmail = message.data.personEmail;
          let textMessage = message.data.text;
          let personId = message.data.personId;
          console.log(message.data);
          if (textMessage.toLowerCase().endsWith('kill')) {
            killSpace(roomId, personEmail);
          } else {
            sendMainCard(roomId, personId);
          }
        } //else, we do nothing when we see thex bot's own message
      });
    })
    .catch((err) => {
      console.error(`error listening to messages: ${err}`);
    });

  webex.attachmentActions
    .listen()
    .then(() => {
      console.log('listening to attachmentAction events');
      webex.attachmentActions.on('created', (attachmentAction) => {
        console.log('------------------------------------------------');
        console.log('attachmentAction created event:');
        console.log(attachmentAction);
        let messageId = attachmentAction.data.messageId;
        let roomId = attachmentAction.data.roomId;
        let inputs = attachmentAction.data.inputs;

        console.log(inputs);
        webex.people.get(attachmentAction.actorId).then((person) => {
          console.log(person);
          let personEmail = person.emails[0];
          if (inputs.submit == 'main') {
            if (inputs.request_type != '') {
              formSubmitted(attachmentAction.actorId, inputs);
              webex.messages.remove(messageId);
              sendWebexMessage(
                roomId,
                'Thank you for your submission. A new space to discuss your request is being created now.'
              );
            } else {
              sendWebexMessage(roomId, `Resubmit request - Please provide **Reuqest Type** to continue.`);
            }
          } else if (inputs.submit == 'intro') {
            webex.messages.remove(messageId);
            sendMainCard(roomId);
          }
        });
      });
    })
    .catch((err) => {
      console.error(`error listening to attachmentActions: ${err}`);
    });
}

module.exports = { botSetup, eventListener };
