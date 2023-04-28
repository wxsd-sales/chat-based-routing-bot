var webex = require('webex/env');

let mainCard = require('../cards/main.json');
let defaultCard = require('../cards/defaultCard.json');
let { mongoClient, mongoDB, typeCol, collectionType } = require('../utils/db.js');

function sendMainCard(roomId, personId) {
  let engagementTypes = [];
  mongoClient
    .db(mongoDB)
    .collection(collectionType)
    .find({ personID: personId })
    .toArray(function (err, documents) {
      console.log('got engagementTypes');
      console.log('documents', documents);
      if (documents.length > 0) {
        for (let doc of documents) {
          console.log('type', doc.scenario);
          for (let scenarioList of doc.scenarioList) {
            engagementTypes.push({
              title: scenarioList.scenario,
              value: scenarioList.scenario
            });
          }
        }
        mainCard.body[0].columns[0].items[0].url = process.env.BRANDING_IMAGE_URL;
        mainCard.body[2].choices = engagementTypes;
        mainCard.body[2].value = engagementTypes[0]['value']; //preselect first item as value.  remove this line to default to --select-- placeholder in JSON card.
        sendWebexMessage(roomId, 'Engagement Request Form - Adaptive Card', mainCard);
      } else {
        mongoClient
          .db(mongoDB)
          .collection(collectionType)
          .find({ personID: 'default' })
          .toArray(function (err, documents) {
            for (let doc of documents) {
              console.log('type', doc.scenario);
              for (let scenarioList of doc.scenarioList) {
                engagementTypes.push({
                  title: scenarioList.scenario,
                  value: scenarioList.scenario
                });
              }
            }
            defaultCard.body[0].columns[0].items[0].url = process.env.BRANDING_IMAGE_URL;
            defaultCard.body[2].choices = engagementTypes;
            defaultCard.body[2].value = engagementTypes[0]['value']; //preselect first item as value.  remove this line to default to --select-- placeholder in JSON card.
            sendWebexMessage(roomId, 'Engagement Request Form - Adaptive Card', defaultCard);
          });
      }
    });
}

function sendIntroSpaceMessage(roomId, actorId, inputs) {
  msg = `<@personId:${actorId}|> has requested assistance with:  \n`;

  msg += `>**Request Type**: ${inputs.request_type}  \n`;
  msg += `>**Additional Comments**: ${inputs.comments}\n\n`;
  return sendWebexMessage(roomId, msg);
}

function sendWebexMessage(roomId, message, card) {
  let payload = {
    roomId: roomId,
    markdown: message
  };
  if (card !== undefined) {
    payload.attachments = [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: card
      }
    ];
  }
  webex.messages.create(payload).catch((err) => {
    console.log(`error sending message card: ${err}`);
  });
}

module.exports = { sendIntroSpaceMessage, sendMainCard, sendWebexMessage };
