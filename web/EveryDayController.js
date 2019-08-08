var everyDayDao = require('../dao/everyDayDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/RespUtil')
var path = new Map();
function editEveryDay(request,response){
    request.on("data",function(data){
        console.log(data.toString())
        everyDayDao.insertEveryDay(data.toString(),timeUtil.getNow(),function(result){
            response.writeHead(200)
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end()
        })
        
    })
}
path.set("/editEveryDay",editEveryDay);

function queryEveryDay(request,response){
    everyDayDao.queryEveryDay(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res))
        response.end()
    })
}
path.set("/queryEveryDay",queryEveryDay);
module.exports.path=path