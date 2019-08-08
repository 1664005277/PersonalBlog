var dbutil = require('./dbutil');
//插入标签
function insertTag(tag,ctime,utime,success){
    var insertSql = "insert into tags (`tag`,`ctime`,`utime`) values (?,?,?)";
    var params = [tag,ctime,utime];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            console.log('收录标签',tag)
            success(result);
        }else{
            throw new Error('插入标签错误')
        }
        
    })
    connection.end()
}
//查询指定标签名
function queryTag(tag,success){
    var querySql = "select * from tags where tag = ?;";
    var connection = dbutil.createConnection();
    connection.query(querySql,tag,function(error,result){
        if(error == null){
            console.log('查询标签：',tag)
            success(result);
        }else{
            throw new Error('查询标签错误')
        }
        
    })
    connection.end()
}
//查询所有标签
function queryRandomTags(success){
    var querySql = "select * from tags;";
    var connection = dbutil.createConnection();
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error('查询标签云错误')
        }
        
    })
    connection.end()
}
//
function queryBlogCountByTag(tag,success){
    var querySql = "select * from tags where tag = ?;";
    var connection = dbutil.createConnection();
    connection.query(querySql,tag,function(error,result){
        if(error == null){
            console.log('查询标签：',tag)
            success(result);
        }else{
            throw new Error('查询标签错误')
        }
        
    })
    connection.end()
}

module.exports.queryBlogCountByTag = queryBlogCountByTag;
module.exports.queryRandomTags = queryRandomTags;
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
