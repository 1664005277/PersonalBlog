var dbutil = require('./dbutil');
//插入一条博客
function insertBlog(title,content,views,tags,ctime,utime,success){
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values (?,?,?,?,?,?)";
    var params = [title,content,views,tags,ctime,utime];
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

//获取一个页面上的博客文章
function queryBlogByPage(page,pageSize,success){
    var querySql = "select * from blog order by id desc limit ?,?;";
    var params = [page*pageSize,pageSize]
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            throw new Error('获取博客文章错误')
        }
        
    })
    connection.end()
}
//查询博客总数
function queryBlogCount(success){
    var querySql = "select count(1) as count from blog";
    var params = []
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            throw new Error('获取博客文章错误')
        }
        
    })
    connection.end()
}
//根据id查询博客信息
function queryBlogById(blog_id,success){
    var querySql = "select * from blog where id = ?";
    var params = [blog_id];
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error('获取博客文章错误')
        }
        
    })
    connection.end()
}
//查询所有的博客文章
function queryAllBlog(success){
    var querySql = "select * from blog order by id desc";
    var params = [];
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error('获取博客文章错误')
        }
        
    })
    connection.end()
}
//添加一条博客的浏览次数
function addViews(blog_id,success){
    var querySql = "update blog set views = views + 1 where id = ?";
    var params = [blog_id]
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            throw new Error('添加文章浏览次数错误')
        }
        
    })
    connection.end()
};
//查询最热门文章
function queryHotBlog(size,success){
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size]
    var connection = dbutil.createConnection();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            // console.log(result)
            success(result);
        }else{
            throw new Error('查询最热门文章错误')
        }
        
    })
    connection.end()
}
module.exports.queryHotBlog = queryHotBlog;
module.exports.addViews = addViews;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogById = queryBlogById;
module.exports.insertBlog = insertBlog;
module.exports.queryBlogCount=queryBlogCount;
module.exports.queryBlogByPage = queryBlogByPage;