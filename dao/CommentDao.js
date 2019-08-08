var dbutil = require('./dbutil');
//插入一条评论
function insertComment(blog_id,parent,parent_name,user_name,user_email,ctime,utime,content,success){
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`user_email`,`ctime`,`utime`,`content`) values (?,?,?,?,?,?,?,?)";
    var params = [blog_id,parent,parent_name,user_name,user_email,ctime,utime,content];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            // console.log('我成功了')
            success(result);
        }else{
            console.log(error)
            throw new Error('插入博客文章错误')
        }  
    })
    connection.end()
}
//根据博客查询相关评论
function queryCommentsByBlogId(blog_id,success){
    var insertSql = "select * from comments where blog_id = ?";
    var params = [blog_id];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error)
            throw new Error('插入博客文章错误')
        }  
    })
    connection.end()
}
//查询博客共有多少评论
function queryCommentsCountByBlogId(blog_id,success){
    var insertSql = "select count(1) as count from comments where blog_id = ?";
    var params = [blog_id];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            console.log(error)
            throw new Error('插入博客文章错误')
        }  
    })
    connection.end()
}
//查询最新评论
function queryNewComments(size,success){
    var insertSql = "select * from comments order by id desc limit ?";
    var params = [size];
    var connection = dbutil.createConnection();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            console.log(error)
            throw new Error('查询最新评论错误')
        }  
    })
    connection.end()
}
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.insertComment = insertComment;
module.exports.queryNewComments = queryNewComments;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId