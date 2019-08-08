var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:"sjhhfiaoljopajh"
    },
    computed:{
        getContent:function(){
            return this.getContent
        },
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryEveryDay"
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content
        }).catch(function(resp){
            console.log('请求每日一句失败')
        })
    }
});
var articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[{
            title:'垃圾分类',
            content:'奥斯卡京东方安徽扒鸡搜集发安排时间哦佛家爬爬山京东方',
            date:'2019-07-17',
            views:'101',
            tags:'test1 test2',
            id:'1',
            link:""
        }]
    },
    computed:{
        jumpTo:function(){
            return function(page){
                
                this.getPage(page,this.pageSize);
            }
        },
        getPage(){
            return function(page,pageSize){
                var searcheUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : "";
                var tag = '';
                for(var i = 0; i < searcheUrlParams.length; i++){
                    if(searcheUrlParams[i].split('=')[0] == "tag"){
                        try{
                            tag = searcheUrlParams[i].split('=')[1];
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
                if(tag == ''){//如果不是查询情况则拉取文章
                    axios({
                        method:"get",
                        url:"/queryBlogByPage?page="+(page-1)+"&pageSize="+pageSize
                    }).then(function(resp){
                        // console.log(resp)
                        var result = resp.data.data;
                        var list =[];
                        articleList.page = page;
                        for(var i = 0;i <result.length;i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "blog_detail.html?blog_id="+result[i].id;
                            list.push(temp)
                        }
                        articleList.articleList = list;
                    }).catch(function(resp){
                        console.log('请求博客文章错误')
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(res){
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }else{
                    axios({
                        method:"get",
                        url:"/queryBlogByTag?tag="+ tag + "&page="+(page-1)+"&pageSize="+pageSize
                    }).then(function(resp){
                        console.log(resp)
                        var result = resp.data.data;
                        var list =[];
                        articleList.page = page;
                        for(var i = 0;i <result.length;i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "blog_detail.html?blog_id="+result[i].id;
                            list.push(temp)
                        }
                        articleList.articleList = list;
                        console.log(articleList.articleList)
                    }).catch(function(resp){
                        console.log('请求博客文章错误')
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCountByTag?tag="+ tag
                    }).then(function(res){
                        console.log("----",res)
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
                
            }
        },
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            console.log(totalCount)
            var result = [];
            result.push({text:'<<',page:1});
            if(nowPage > 2){
                result.push({text:nowPage-2,page:nowPage-2});
            }
            if(nowPage > 1){
                result.push({text:nowPage-1,page:nowPage-1});
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage+1,page:nowPage+1});
            } 
            if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage+2,page:nowPage+2});
            }
            result.push({text:'>>',page:parseInt( (totalCount + pageSize - 1) / pageSize )});  
            this.pageNumList = result;
            return result; 
        }
    },
    created:function(){
        this.getPage(this.page,this.pageSize)
    }
})
