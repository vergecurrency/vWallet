/*
wget --no-check-certificate https://verge-blockchain.com/blockchain/go.sh-Verge-Blockchain.zip

#checksum
sudo rm blockchain
wget https://www.vergecurrency.com/checksums/blockchain
md5sum go.sh-Verge-Blockchain.zip > md5
checksum="$(grep $(cat md5) blockchain)"
if [ -z "$checksum" ];
then
    echo "Warning: MD5 is not matching"
else
    echo "MD5 is matching...Success"
fi

unzip -o go.sh-Verge-Blockchain.zip -d ~/.VERGE
sudo rm go.sh-Verge-Blockchain.zip
*/

var fs = require('fs')
var request = require('request')
var progress = require('request-progress')
var bitrate = require('bitrate')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// The options argument is optional so you can omit it
progress(
  request('https://verge-blockchain.com/blockchain/go.sh-Verge-Blockchain.zip'),
)
  .on('progress', function(state) {
    console.log('progress: ', (state.percent * 100).toFixed(2), `%`)
    console.log(
      'speed: ',
      bitrate(state.size.transferred, state.time.elapsed, 'MBps').toFixed(2),
      ` mbps`,
    )
  })
  .on('error', function(err) {
    // Do something with err
    console.error(err)
  })
  .on('end', function() {
    // Do something after request finishes
    console.log(Finished)
  })
  .pipe(fs.createWriteStream('./blockchain.zip'))
