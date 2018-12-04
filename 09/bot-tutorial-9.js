let fs = require('fs');
let steem = require('steem');

let file = './entries.json'
let TAG = 'travel'
let MENTION = '@travelcomp'
const ACCOUNT_NAME = ''
const ACCOUNT_KEY = ''

function saveData(postData){
    let data = fs.readFileSync(file, 'utf8')
    let array = JSON.parse(data);
    array.push(postData);
    let json = JSON.stringify(array);
    fs.writeFileSync(file, json, 'utf8');
}

steem.api.streamTransactions('head', function(err, result) {
  let txType = result.operations[0][0]
  let txData = result.operations[0][1]

  if (txType == 'comment' && txData.parent_permlink == TAG && txData.body.includes(MENTION)) {
    console.log('TAG FOUND: ', txData)

    let data = {
      name: txData.author,
      title: txData.title,
      tag: TAG,
      permlink: txData.permlink
    }

    saveData(data)
    sendReply(txData)
  }
});

function sendReply(txData){
  let comment = `Thanks for entering the TopTravelPhoto contest, see the latest post on Monday from @TopTravelPhoto for results`
  steem.broadcast.comment(
    ACCOUNT_KEY,
    txData.author,
    txData.permlink,
    ACCOUNT_NAME,
    randomString(),
    '',
    comment,
    { tags: ['contest'], app: 'contestbot' },
    function(err, result) {
      console.log(err, result);
    }
  );
}
function randomString() {
  let string = ''
  let allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 32; i++){
    string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
  }
  return string + '-post';
}
