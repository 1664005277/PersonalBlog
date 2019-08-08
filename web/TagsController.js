var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/RespUtil');
var tagDao = require('../dao/TagDao');
var blogDao = require('../dao/BlogDao')
var tagBlogMapDao = require('../dao/tagBlogMappingDao')
var url =require('url');
var path = new Map();
function queryRandomTags(request,response){
    try{
        tagDao.queryRandomTags(function(res){
            res.sort(function(){
                return Math.random() > 0.5 ? true : false;
            })
            response.writeHead(200)
            response.write(respUtil.writeResult('success','添加成功',res))
            response.end()
        })
    }catch(e){
        console.log('web查询标签云错误: ',e)
    } 
}
function queryBlogByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagDao.queryTag(params.tag,function(res){
        if(res == null || res.length==0){
            response.writeHead(200)
            response.write(respUtil.writeResult('success','添加成功',res))
            response.end()
        }else{
            tagBlogMapDao.queryBlogByTag(res[0].id,parseInt(params.page),parseInt(params.pageSize),function(res){
                var blogList = [];          
                for(var i = 0; i<res.length;i++){
                    var ll = res.length
                        blogDao.queryBlogById(res[i].blog_id,function(res){
                            blogList.push(res[0]);
                            if(ll == blogList.length) {
                                blogList.sort(function(a,b){
                                    return b.id - a.id;
                                })
                                blogList=clearContent(blogList);
                                response.writeHead(200)
                                response.write(respUtil.writeResult('success','添加成功',blogList))
                                response.end()
                            }
                        })
                }
            })
        } 
    })  
}
function clearContent(res){
    for(var i = 0; i< res.length;i++){
        res[i].content = res[i].content.replace(/<img[\w\W]*>/g,"");
        res[i].content = res[i].content.replace(/<[^>]+>/g,"");
        res[i].content = res[i].content.substring(0,300);
    }
    return res;
}
function queryBlogCountByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagDao.queryTag(params.tag,function(res){
        try{
            tagBlogMapDao.queryBlogCountByTag(res[0].id,function(res){
            response.writeHead(200)
            response.write(respUtil.writeResult('success','添加成功',res))
            response.end()
            })
        }catch(e){
            console.log("空标签查询")
            response.writeHead(200)
            response.write(respUtil.writeResult('success','没有此标签相关的博客',res))
            response.end()
        }
    })
}
path.set("/queryBlogCountByTag",queryBlogCountByTag);
path.set("/queryBlogByTag",queryBlogByTag);
path.set("/queryRandomTags",queryRandomTags);
module.exports.path=path