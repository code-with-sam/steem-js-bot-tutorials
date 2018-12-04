// Tutorial 07 - Schedule Steem-Js Tasks
const steem = require('steem')
const schedule = require('node-schedule')

const ACCOUNT_NAME = ''
const ACCOUNT_KEY = ''
steem.api.setOptions({ url: 'https://api.steemit.com' });

schedule.scheduleJob('* 18 * * *', function(){
  claimBalance()
});

function claimBalance(){
  steem.api.getAccounts([ACCOUNT_NAME], function(err, result){
      console.log(err, result)

      let sbdReward = result[0].reward_sbd_balance
      let steemReward = result[0].reward_steem_balance
      let steemPowerInVests = result[0].reward_vesting_balance

      steem.broadcast.claimRewardBalance(ACCOUNT_KEY, ACCOUNT_NAME, steemReward, sbdReward, steemPowerInVests, function(err, result) {
        console.log(err, result);
      });
  })
}
