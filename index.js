var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: process.env.linebot_channelId,
    channelSecret: process.env.linebot_channelSecret,
    channelAccessToken: process.env.linebot_channelAccessToken
});

const app = express();
const linebotParser = bot.parser();

// default page of Http Get
app.get("/", function (req, res) {
    res.send("Hello this is Tai App.");
});

// Linbot join to line group, and reply default setting message.
bot.on('join', function (event) {
    let groupId = event.source.groupId;
    console.log(groupId);
    event.reply('Integrate with service hooks, copy the following string to HTTP headers of Azure DevOps Service hooks. \n groupId:' + groupId + ' \n https://docs.microsoft.com/en-us/azure/devops/service-hooks/overview?view=azure-devops');
});
app.post('/linebot', linebotParser);

// Provide a web hook of Azure devoops for transfer pull message to Line.
app.use('/devops', express.json());
app.post('/devops', function (req, res) {
    console.log(req.header);
    var groupId = req.header('groupId');
    console.log(groupId);

    var sendMsg = req.body.resource.createdBy.displayName + ' created a PR, approve it by : ' + req.body.resource._links.web.href;
    bot.push(groupId, [sendMsg]).catch(function (err) {
        console.error(err);
    });
    res.send(sendMsg);
});

// Run web
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});