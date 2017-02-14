$(function(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getbaicaijiatitle',
        success:function(data){
            var html=template("tab",data)
            //console.log(data)
            $(".tab_ul").html(html);
            //滑动框架
            itcast.iScroll({
                swipeDom:$(".tab_box").get(0),
                swipeType:'x',
                swipeDistance:50
            });
            //点击变红
            $(".tab_li").on("click",function(){
                console.log($(this));
                $(this).css("border-bottom","2px solid #e4393c")
                    .siblings().css("border-bottom","none");
                //点击当前tab的id
                var titleid=$(this)[0].id;
                //发送请求
               ajax(titleid,function(data){
                   var html=template("wares",data)
                   $("#wares_ul").html(html);
               })
            })
        }
    })
    //默认显示全部标签下面的上商品
    ajax(0,function(data){
        var html=template("wares",data)
        $("#wares_ul").html(html);
    })

    //亲求封装
    function ajax(data,callback){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data:{titleid:data},
            success:function(data){
                callback(data)
            }
        })
    }

})