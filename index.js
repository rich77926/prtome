var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1582543058',
    channelSecret: '62cd62c68b0256d4b88e52a1c3c76de2',
    channelAccessToken: 'jZZH8wMNFC52QX6W9+W6u4+fE73q1966j50Zk/jpDXiyK3E5DLOXoaGTcfBvy/grgdPWTCtSpU5qgW9tQHwWElxmE3kXTpzkvBhEcoFnFUSITeCEQ9RBInXumy9TiIWPuv3Q3Hcl0GEchIzubSgARwdB04t89/1O/w1cDnyilFU='
});

//取得使用者回覆的訊息
// bot.on('message', function (event) {
//     if (event.message.type = 'text') {
//         // var msg = event.message.text;

//         console.log(event.source.groupId);

//         //重覆使用者說的訊息
//         // event.reply("Test").then(function (data) {
//         //     // success
//         //     // console.log(event);
//         // }).catch(function (error) {
//         //     // error
//         //     console.log('error:'+error);
//         // });
//     }
// });

const app = express();
const linebotParser = bot.parser();

app.get("/", function (req, res) { 
    res.send("Hello this is Tai App.");
});

app.use('/devops', express.json());
app.post('/devops', function (req, res) {
    var userId = 'Cf76da8bb9560777af485a8a2fbeffe42';
    var sendMsg = req.body.message.text + ' '+ req.body.resource.url;
    bot.push(userId, [sendMsg]).catch(function(err){console.log(err)});
    res.send(sendMsg);
});

// 主動發送訊息
// setTimeout(function () {
//     var userId = 'Uae110a6760ecc0163e88555fa46a90b2';
//     var sendMsg = "push hands up ";
//     bot.push(userId, [sendMsg]);
//     console.log('userId: ' + userId);
//     console.log('send: ' + sendMsg);
// }, 3000);

app.post('/linebot', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});