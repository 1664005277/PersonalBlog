var blogList = new Vue({
    el:'#blog_list',
    data:{
        blogList:[]
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then(function(res){
            blogList.blogList = res.data.data
        }).catch(function(res){
            console.log('请求文章失败')
        })
    }
})