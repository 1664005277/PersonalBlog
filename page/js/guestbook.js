var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total:100,
        comments:[
            {id:'1',user_name:'sjh',ctime:'2019',content:'hahahaha',options:''},
            {id:'1',user_name:'sjh',ctime:'2019',content:'hahahaha',options:''},
            {id:'1',user_name:'sjh',ctime:'2019',content:'hahahaha',options:''}]
    },
    computed:{
        //回复时修改回复的状态
        reply:function(){
            return function(reply_id,reply_name){
                document.getElementById("reply").value = reply_id;
                document.getElementById("reply_name").value = reply_name;
                location.href="#send_comment";
            }
        }
    },
    created:function(){
        var blog_id = -2;
        //请求该文章下所有评论信息
        axios({
            method:"get",
            url:"queryCommentsByBlogId?blog_id="+blog_id
        }).then(function(res){
            blogComments.comments = res.data.data;
            for(var i = 0; i < blogComments.comments.length; i++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = '回复@'+ blogComments.comments[i].parent_name
                }
            }
        }).catch(function(erro){
            console.log('请求评论信息错误')
        });
        //请求该文章下共有多少条评论信息
        axios({
            method:"get",
            url:"queryCommentsCountByBlogId?blog_id="+blog_id
        }).then(function(res){
            console.log(res)
            blogComments.total = res.data.data[0].count;
        }).catch(function(erro){
            console.log('请求评论信息错误')
        }) 
    }
})
var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vcode:'',
        rightCode:'',
    },
    computed:{
        sendComment:function(){
            return function(){
                var code = document.getElementById("comment_code").value;
                if(code!=sendComment.rightCode){
                    alert('验证码输入错误');
                    return;
                }
                
                var blog_id = -2;
                var reply = document.getElementById("reply").value;
                var replyName = document.getElementById("reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value; 
                console.log("replyName=" + reply_name,)
                axios({
                    method:"get",
                    url:"/addComment?blog_id="+blog_id + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content+ "&parent_name=" + replyName,
                }).then(function(res){
                    alert('评论成功')
                }).catch(function(erro){
                    console.log('添加评论错误')
                })
            }
            
        },
        changeCode:function(){
            return function(){
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function(res){
                    sendComment.vcode = res.data.data.data;
                    sendComment.rightCode = res.data.data.text;
                }).catch(function(erro){
                    console.log('添加评论错误')
                }) 
            }
        }
    },
    created:function(){
        this.changeCode()
    }
})