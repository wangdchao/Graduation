const crypto = require('crypto');

function md5Process(cryptoStr) {
    const result = crypto.createHash('md5').update(cryptoStr).digest("hex")
    //console.log(cryptoStr+' : '+result);
    return result;
}

module.exports={
    md5Crypto:md5Process
}



