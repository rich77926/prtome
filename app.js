var linebot = require('linebot');
var express = require('express');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1527714810',
  channelSecret: '65ed70fea94760555cce9d6716d1f12d',
  channelAccessToken: 'Ght2+eMo4wGplzahPLdRHOjxPNlaxGMM70dJtCMh6VybvDMiXHUfrkrasr1WSIlh10ZmVG2VOsoDWmEkpWEjYKVWT2ZSjYn4ghpajLepIA1rcHBuqlOeFXhzqIuB3ui0NvZapuRWAxxpi3hdVC0JTAdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  event.reply(event.message.text).then(function (data) {
    // 當訊息成功回傳後的處理
  }).catch(function (error) {
    // 當訊息回傳失敗後的處理
  });
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});