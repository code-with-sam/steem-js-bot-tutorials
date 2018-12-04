const steem = require('steem')
const ACCOUNT_NAME = 'learntocode'
const ACCOUNT_KEY = process.env.BOT_POSTING_KEY
const TARGET_ACCOUNT = 'sambillingham'
const {createServer} = require('http').createServer().listen(3000)

console.log('Streaming Transactions...')
steem.api.streamTransactions('head', function(err, result) {
  let txType = result.operations[0][0]
  let txData = result.operations[0][1]

  if(txType == 'vote' && txData.voter == TARGET_ACCOUNT) {
    console.log(`@${TARGET_ACCOUNT} has just voted`)
    console.log('copying vote...')
    sendVote(txData.author, txData.permlink, txData.weight)
  }
});

function sendVote(author, permlink, weight){
  steem.broadcast.vote(ACCOUNT_KEY, ACCOUNT_NAME, author, permlink, weight, function(err, result) {
    console.log(err, result)
    console.log(`WE have just copied @${TARGET_ACCOUNT} and also upvoted @${author}`)
  });
}



// server.listen(3000)
