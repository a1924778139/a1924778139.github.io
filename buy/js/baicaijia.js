$(function(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getbaicaijiatitle',
        success:function(data){
            var html=template("tab",data)
            //console.log(data)
            $(".tab_ul").html(html);
            //�������
            itcast.iScroll({
                swipeDom:$(".tab_box").get(0),
                swipeType:'x',
                swipeDistance:50
            });
            //������
            $(".tab_li").on("click",function(){
                console.log($(this));
                $(this).css("border-bottom","2px solid #e4393c")
                    .siblings().css("border-bottom","none");
                //�����ǰtab��id
                var titleid=$(this)[0].id;
                //��������
               ajax(titleid,function(data){
                   var html=template("wares",data)
                   $("#wares_ul").html(html);
               })
            })
        }
    })
    //Ĭ����ʾȫ����ǩ���������Ʒ
    ajax(0,function(data){
        var html=template("wares",data)
        $("#wares_ul").html(html);
    })

    //�����װ
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