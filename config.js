var fs = require('fs');
// console.log(__dirname)
var config = fs.readFileSync(__dirname + '/server.config')
var globalConf = {}
var configs = config.toString().split('\r\n')
// console.log(configs)
for(var i = 0; i < configs.length; i++){
    var tempConf = configs[i].split('=');
    if(tempConf.length<2){
        continue;
    }else{
        globalConf[tempConf[0]] = tempConf[1];
    }
}

// console.log(globalConf)
module.exports = globalConf;