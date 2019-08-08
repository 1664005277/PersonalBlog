var dbutil = require('./dbutil');
//插入博客标签映射表
function insertTagBlogMapping(blog_id,tag_id,ctime,utime,success){
    var insertSql = "insert into tag_blog_mapping (`blog_id`,`tag_id`,`ctime`,`utime`) values (?,?,?,?)";
    var params = [blog_id,tag_id,ctime,utime];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            console.log('收录博客标签映射')
            success(result);
        }else{
            console.log(blog_id,tag_id,ctime,utime)
            throw new Error('插入博客标签映射表错误')
        }
        
    })
    connection.end()
}
//根据标签查找博客
function queryBlogByTag(tagId,page,pageSize,success){
    var insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
    var params = [tagId,page*pageSize,pageSize];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            
            throw new Error('根据标签查找博客错误')
        }
        
    })
    connection.end()
}
//该标签下所有博客数量
function queryBlogCountByTag(tagId,success){
    var insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            
            throw new Error('查找该标签下所有博客数量错误')
        }
        
    })
    connection.end()
}
// queryBlogCountByTag(1,function(res){console.log(res)});
module.exports.queryBlogCountByTag = queryBlogCountByTag;
module.exports.queryBlogByTag = queryBlogByTag;
module.exports.insertTagBlogMapping = insertTagBlogMapping;