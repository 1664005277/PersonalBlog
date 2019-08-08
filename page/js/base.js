var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:['网络错误！请求失败']
    },
    computed:{
        randomColor:function(){
            return function(){
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb(" + red + ','+ green + ',' + blue+ ")"
            }
        },
        randomSize:function(){
            return function(){
                return (Math.floor(Math.random()*10 + 10) + 'px')
            }  
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function(res){
            var tags = []
            for(var i = 0; i<res.data.data.length;i++){
                tags.push(res.data.data[i].tag)
            }
            randomTags.tags=tags
            
        }).catch(function(erro){
            console.log('请求标签云信息错误')
        }) 
    }
})


var newHot = new Vue({
    el:"#new_hot",
    data:{
        hostTitleList:[{
            title:'网络请求错误！请检查网络连接',
            link:'#',
        }]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(res){
            var blogs = []
            for(var i = 0; i<res.data.data.length;i++){
                var obj = {}
                obj.title=res.data.data[i].title;
                obj.link='http://127.0.0.1:12306/blog_detail.html?blog_id=' + res.data.data[i].id;
                blogs.push(obj)
            }
            newHot.hostTitleList = blogs;
        }).catch(function(erro){
            console.log('请求标签云信息错误')
        }) 
    }
});


var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[{
            name:'',
            data:'',
            say:'网络请求错误！请检查网络连接'
        }]
    },
    created:function(){
        console.log(2)
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function(res){
            // console.log(res)
            var newCommentList = []
            for(var i = 0; i<res.data.data.length;i++){
                var obj = {}
                obj.name=res.data.data[i].user_name;
                obj.data=res.data.data[i].ctime;
                obj.say=res.data.data[i].content;
                newCommentList.push(obj)
            }
            newComments.commentList = newCommentList;
        }).catch(function(erro){
            console.log('请求标签云信息错误')
        }) 
    }
})