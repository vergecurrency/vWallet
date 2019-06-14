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

import { createWriteStream } from 'fs'
import request from 'request'
import requestProgress from 'request-progress'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

/*#checksum
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
sudo rm go.sh-Verge-Blockchain.zip*/

interface IState {
  progress: number
  speed: number
  time: { elapsed: number; remaining: number }
  size: {
    total: number
    transferred: number
  }
}

export const downloadBlockchain = (
  progress: (state: IState) => void,
  end: () => void,
  error: (error) => void,
) => {
  requestProgress(
    request(
      'https://verge-blockchain.com/blockchain/go.sh-Verge-Blockchain.zip',
    ),
  )
    .on('progress', progress)
    .on('end', end)
    .on('error', error)
    .pipe(createWriteStream('./blockchain.zip'))
}
