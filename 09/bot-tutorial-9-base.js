let steem = require('steem');

steem.api.streamTransactions('head', function(err, result) {
  let txType = result.operations[0][0]
  let txData = result.operations[0][1]

  console.log(txType,txData)
})
