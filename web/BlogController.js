var blogDao = require('../dao/BlogDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/RespUtil');
var tagDao = require('../dao/TagDao');
var tagBlogMapDao = require('../dao/tagBlogMappingDao')
var url =require('url');
var path = new Map();
//添加一条博客
function editBlog(reques,response){
    var params =url.parse(reques.url,true).query;
    var tags = params.tags.replace(/ /g,"").replace("，",",")
    reques.on('data',function(data){
        // console.log('这是插入博客参数：');console.log(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow())
        blogDao.insertBlog(params.title,data.toString().trim(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function(res){
            response.writeHead(200)
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            var blogId = res.insertId;//记录刚插入的博客id
            var tagList = tags.split(",");//博客带的标签
            for(var i=0;i<tagList.length;i++){
                if(tagList[i] == ""){
                    continue;
                }else{
                    queryTag(tagList[i],blogId);
                }
            }
        })
    })
}
//查询标签
function queryTag(tag,blogId){
    tagDao.queryTag(tag,function(res){
        if(res == null || res.length == 0){//如果标签未收录则先收录标签再建立映射
            insertTag(tag,blogId)
        }else{//如果标签已收录则直接建立映射
            tagBlogMapDao.insertTagBlogMapping(blogId,res[0].id,timeUtil.getNow(),timeUtil.getNow(),function(res){
                console.log('成功映射')
            })
        }
    })
}
//插入标签
function insertTag(tag,blogId){
    tagDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function(res){//成功收录标签后建立映射
        tagBlogMapDao.insertTagBlogMapping(blogId,res.insertId,timeUtil.getNow(),timeUtil.getNow(),function(res){
            console.log('成功映射')
        })
    })
}
//插入 标签------->博客 映射表
function insertTagBlogMapping(blogId,tagId){
    tagBlogMapDao.insertTagBlogMapping(blogId,tagId,timeUtil.getNow(),timeUtil.getNow(),function(res){
        console.log('成功映射')
    })
}
//按当前页查询博客文章列表
function queryBlogByPage(requese,response){
    var params = url.parse(requese.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(res){
        for(var i = 0; i < res.length; i++){
            res[i].content = res[i].content.replace(/<img[\w\W]*>/g,"");
            res[i].content = res[i].content.replace(/<[^>]+>/g,"");
            res[i].content = res[i].content.substring(0,300);
        }
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
//按当前页查询博客文章总数
function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','查询成功',res));
        response.end();
    })
}
//按当前id查询博客文章详细信息
function queryBlogById(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.blog_id),function(res){
        response.writeHead(200)
        blogDao.addViews(parseInt(params.blog_id),function(res){
        });
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
//查询所有的文章
function queryAllBlog(request,response){
    blogDao.queryAllBlog(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult('success','添加成功',res));
        response.end();
    })
}
//查询热门文章
function queryHotBlog(request,response){
    try{
        var params = url.parse(request.url,true).query;
        blogDao.queryHotBlog(5,function(res){
            response.writeHead(200)
            response.write(respUtil.writeResult('success','查询成功',res));
            response.end();
        })

    }catch(e){
        console.log('web层查询热门文章：',e)
    }
}
path.set("/queryHotBlog",queryHotBlog)
path.set("/queryAllBlog",queryAllBlog)
path.set("/queryBlogById",queryBlogById)
path.set("/queryBlogCount",queryBlogCount)
path.set("/queryBlogByPage",queryBlogByPage)
path.set("/editBlog",editBlog);
module.exports.path=path
