var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: '1580401641',
  channelSecret: 'd0e15a3c41a0a13913004e50d89bd9c6',
  channelAccessToken: 'Ght2+eMo4wGplzahPLdRHOjxPNlaxGMM70dJtCMh6VybvDMiXHUfrkrasr1WSIlh10ZmVG2VOsoDWmEkpWEjYKVWT2ZSjYn4ghpajLepIA1rcHBuqlOeFXhzqIuB3ui0NvZapuRWAxxpi3hdVC0JTAdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
