var dbutil = require('./dbutil');
//插入每日一句
function insertEveryDay(content,ctime,success){
    var insertSql = "insert into every_day (`content`,`ctime`) values (?,?)";
    var params = [content,ctime];
    
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            
            success(result);
        }else{
            throw new Error('插入每日一句错误')
        }
        
    })
    connection.end()
}

//获取最新每日一句数据
function queryEveryDay(success){
    var querySql = "select * from every_day order by id desc limit 1;";
    var connection = dbutil.createConnection();
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error('获取每日一句错误')
        }
        
    })
    connection.end()
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
