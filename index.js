var express = require('express');
var gloablConf = require('./config');
var loader = require('./loader')
var app = new express();
app.use(express.static(__dirname+"/"+gloablConf.page_path+"/"));
app.post('/editEveryDay',loader.get('/editEveryDay'));//修改每日一句
app.get('/queryEveryDay',loader.get('/queryEveryDay'));//查询每日一句
app.post('/editBlog',loader.get('/editBlog'));//修改博客
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));//查询当前页博客文章
app.get('/queryBlogCount',loader.get('/queryBlogCount'));//查询博客文章总数
app.get('/queryBlogById',loader.get('/queryBlogById'));//根据博客id查询
app.get('/addComment',loader.get('/addComment'));//添加评论
app.get('/queryRandomCode',loader.get('/queryRandomCode'));//验证码
app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'));//查询该博客下的评论
app.get('/queryCommentsCountByBlogId',loader.get('/queryCommentsCountByBlogId'));//查询该博客下的评论总数
app.get('/queryAllBlog',loader.get('/queryAllBlog'));//查询所有博客
app.get('/queryRandomTags',loader.get('/queryRandomTags'));//查询标签云
app.get('/queryHotBlog',loader.get('/queryHotBlog'));//查询最热门文章
app.get('/queryNewComments',loader.get('/queryNewComments'));//查询最新评论
app.get('/queryBlogByTag',loader.get('/queryBlogByTag'));//根据标签查询文章
app.get('/queryBlogCountByTag',loader.get('/queryBlogCountByTag'));
app.listen(gloablConf.port,function(){
    console.log('服务器已启动')
})