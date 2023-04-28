let { mongoClient, mongoDB, typeCol, collectionType } = require('../utils/db.js');
var webex = require('webex/env');
let { sendWebexMessage, sendIntroSpaceMessage } = require('./messages.js');
let { createWebexMembership, updateWebexMembership } = require('./memberships.js');
require('dotenv').config();

async function formSubmitted(actorId, inputs) {
  console.log('formSubmitted');
  console.log(inputs);
  let cursor = await mongoClient
    .db(mongoDB)
    .collection(collectionType)
    .aggregate([{ $match: { personID: actorId } }]);
  let doc;
  if (await cursor.hasNext()) {
    doc = await cursor.next();
    console.log('doc:');
    console.log(doc);
    let roomPayload = {
      title: `${process.env.BRANDING_NAME} Coach: ${inputs.request_type} - ${Date.now()}`
    };
    if ([null, undefined, ''].indexOf(doc.teamId) < 0) {
      roomPayload['teamId'] = doc.teamId;
    }
    webex.rooms
      .create(roomPayload)
      .then(async function (room) {
        console.log('Engagement Type:', room);
        console.log('LINE 248');
        let memberships = await webex.memberships.list({ roomId: room.id });
        console.log('memberships', memberships);
        let botsMembership = memberships.items[0];
        //updating current rooms bot membership
        await updateWebexMembership(botsMembership);
        let isCreated = false;
        let actorMembership;
        for (let pers of doc.memberList) {
          await createWebexMembership({
            roomId: room.id,
            personEmail: pers.email
          }).then(async (membership) => {
            //console.log(membership);
            if (membership.personId == actorId) {
              isCreated = true;
              actorMembership = membership;
            }
            if (pers.isModerator === true) {
              await updateWebexMembership(membership);
            }
          });
        }
        if (!isCreated) {
          actorMembership = await createWebexMembership({
            roomId: room.id,
            personId: actorId
          });
        }

        await sendIntroSpaceMessage(room.id, actorId, inputs);
      })
      .catch(function (error) {
        let msg = `formSubmitted Error: failed to create room: ${error}`;
        console.log(msg);
        console.log(roomPayload);
        sendWebexMessage(process.env.ERROR_ROOM_ID, msg);
      });
  } else {
    let defaultCursor = await mongoClient
      .db(mongoDB)
      .collection(collectionType)
      .aggregate([{ $match: { personID: 'default' } }]);
    if (await defaultCursor.hasNext()) {
      doc = await defaultCursor.next();
      console.log('doc:');
      console.log(doc);
      let roomPayload = {
        title: `${process.env.BRANDING_NAME} Coach: ${inputs.request_type} - ${Date.now()}`
      };
      if ([null, undefined, ''].indexOf(doc.teamId) < 0) {
        roomPayload['teamId'] = doc.teamId;
      }
      webex.rooms
        .create(roomPayload)
        .then(async function (room) {
          console.log('Engagement Type:', room);
          console.log('LINE 248');
          let memberships = await webex.memberships.list({ roomId: room.id });
          console.log('memberships', memberships);
          let botsMembership = memberships.items[0];
          //updating current rooms bot membership
          await updateWebexMembership(botsMembership);
          let isCreated = false;
          let actorMembership;
          for (let pers of doc.memberList) {
            await createWebexMembership({
              roomId: room.id,
              personEmail: pers.email
            }).then(async (membership) => {
              //console.log(membership);
              if (membership.personId == actorId) {
                isCreated = true;
                actorMembership = membership;
              }
              if (pers.isModerator === true) {
                await updateWebexMembership(membership);
              }
            });
          }
          if (!isCreated) {
            actorMembership = await createWebexMembership({
              roomId: room.id,
              personId: actorId
            });
          }

          await sendIntroSpaceMessage(room.id, actorId, inputs);
        })
        .catch(function (error) {
          let msg = `formSubmitted Error: failed to create room: ${error}`;
          console.log(msg);
          console.log(roomPayload);
          sendWebexMessage(process.env.ERROR_ROOM_ID, msg);
        });
    }
  }
}

module.exports = { formSubmitted };
