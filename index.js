var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1527714810',
    channelSecret: '65ed70fea94760555cce9d6716d1f12d',
    channelAccessToken: 'wGu8qEGNCRCmH1sPtiOBMlfYBMH29aoNjUbJ/DT4Q+JTuIduvWtMIVOIinIclAN3GWVCvk5HTiUy2VKemVz5YVMDplTazfMFccM2PVT6xWjs+0OMhcBV18stBs29OpXyuMDZpxziYueH6OQOUykuqAdB04t89/1O/w1cDnyilFU='
});

//var bot = linebot({
//    channelId: '1580401641',
//    channelSecret: 'd0e15a3c41a0a13913004e50d89bd9c6',
//    channelAccessToken: 'wGu8qEGNCRCmH1sPtiOBMlfYBMH29aoNjUbJ/DT4Q+JTuIduvWtMIVOIinIclAN3GWVCvk5HTiUy2VKemVz5YVMDplTazfMFccM2PVT6xWjs+0OMhcBV18stBs29OpXyuMDZpxziYueH6OQOUykuqAdB04t89/1O/w1cDnyilFU='
//});

//取得使用者回覆的訊息
bot.on('message', function (event) {
    if (event.message.type = 'text') {
        var msg = event.message.text;

        console.log(msg);


        //重覆使用者說的訊息
        event.reply("Test").then(function (data) {
            // success
            // console.log(event);
        }).catch(function (error) {
            // error
            console.log('error:'+error);
        });
    }
});

// 主動發送訊息
 setTimeout(function () {
    var userId = 'Ud2a05f0c765c644f5c283b38b9aad803';
    var sendMsg = "push hands up ";
    bot.push(userId, [sendMsg]);
    console.log('userId: ' + userId);
    console.log('send: ' + sendMsg);
}, 5000);


const app = express();
const linebotParser = bot.parser();
app.get("/", function (req, res) { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});