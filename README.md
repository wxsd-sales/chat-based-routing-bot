# Chat Based Routing Bot

### Usage
1. User sends a message to the bot and fills in required details the bot asks for.
2. Once the user submits the request the bot creates a room and adds the default members required in that space along with the user who has requested assistance.
3. Once you are done, any moderator of that space can delete the room by mentioning the bot and using the kill command ex:@Bot kill

### Setup
You will need to create a file called **.env** that includes the following lines:
```
PORT=
WEBEX_LOG_LEVEL=debug
WEBEX_ACCESS_TOKEN=
MONGO_URI=
MONGO_DB=cbroutingBot

ERROR_ROOM_ID=
```
Note:
1. You will need to provide a port for this to run locally
2. You will need to provide an access_token of a test bot for testing
3. You will need to provide a roomId for error messages to be sent. This can be any Webex Space roomId that your bot is a member of.
4. You can use the Mongo credentials shown above in the .example.env file

### MongoDB Schema
If you are trying to create your own MongoDB, the schema looks as follows:
```
{
  "type":"",
  "team_id":"",
  "people":[
  {
    "email":"",
    "isModerator":true/false
  }]
}
```
Note:
1. "type" is the request type you want the user to choose from.
2. "team_id" is the Webex Team ID in which the spaces will be generated.
3. Note that bot should be the member of the team
4. People details, whom you want to be the default members for the space.
5. Note that if you want that person to be the moderator for the space he should be a member of that team.

### Install
The typical npm install flow, after cloning this repo
```
npm install
npm start
```
