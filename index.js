var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582543058',
    channelSecret: '62cd62c68b0256d4b88e52a1c3c76de2',
    channelAccessToken: 'jZZH8wMNFC52QX6W9+W6u4+fE73q1966j50Zk/jpDXiyK3E5DLOXoaGTcfBvy/grgdPWTCtSpU5qgW9tQHwWElxmE3kXTpzkvBhEcoFnFUSITeCEQ9RBInXumy9TiIWPuv3Q3Hcl0GEchIzubSgARwdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();

app.get("/", function (req, res) { 
    res.send("Hello this is Tai App.");
});

app.on('join', function (event) {
    event.reply('Thanks for invite me to this group, this group id is : ' + event.source.groupId);
  });

app.use('/devops', express.json());
app.post('/devops', function (req, res) {
    var groupId = req.headers['groupId'];
    //var userId = 'Cf76da8bb9560777af485a8a2fbeffe42';
    var sendMsg = req.body.resource.createdBy.displayName + ' created a PR, approve it by : '+ req.body.resource._links.web.href;
    bot.push(groupId, [sendMsg]).catch(function(err){console.log(err)});
    res.send(sendMsg);
});

app.post('/linebot', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});