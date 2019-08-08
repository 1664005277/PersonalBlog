var captcha = require('svg-captcha')
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/RespUtil');
var commentDao = require('../dao/CommentDao')
var url =require('url');
var path = new Map();
//添加评论
function addComment(request,response){
    var params =url.parse(request.url,true).query;
    // console.log(params)
    commentDao.insertComment(parseInt(params.blog_id),parseInt(params.parent),params.parent_name,params.userName,params.email,timeUtil.getNow(),timeUtil.getNow(),params.content,function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',null));
        response.end();
    }) 

}
//发送验证码
function queryRandomCode(resquest,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200)
    response.write(respUtil.writeResult('success','添加成功',img));
    response.end();
}
//查询博客下面的评论
function queryCommentsByBlogId(request,response){
    var params =url.parse(request.url,true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.blog_id),function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
//查询博客共有多少评论
function queryCommentsCountByBlogId(request,response){
    var params =url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.blog_id),function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
function queryNewComments(request,response){
    commentDao.queryNewComments(5,function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
path.set('/queryNewComments',queryNewComments)
path.set('/queryCommentsCountByBlogId',queryCommentsCountByBlogId)
path.set('/queryCommentsByBlogId',queryCommentsByBlogId)
path.set('/queryRandomCode',queryRandomCode)
path.set('/addComment',addComment)
module.exports.path = path