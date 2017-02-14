/**
 * Created by hasee on 2017/1/11.
 */
$(function(){
    function  rep(url,mesg,thing,click,other,callback){
        $.ajax({
            url:url,
            success:function(data){
                var html=template(mesg,data);
                click.html(html);
                thing.on("click",function(){
                    if(other.css("display")=="block"){
                        other.hide();
                        click.show();

                    }else if(click.css("display")=="block"){
                        click.hide();
                    }else{
                        click.show()
                    }
                })
                callback(data);
            }
        })
    }
    //店铺
    rep('http://mmb.ittun.com/api/getgsshop',
        "shop_mesg",
        $("#shop"),
        $(".shop_detail_ul"),
        $(".area_detail_ul"),
        function fun(data){
            $(".shop_detail_li").on("click",function(){
                $("#shop>span").text($(this)[0].innerText);
                //$("#shop>span")[0].id=$(this)[0].id;
                var attr=$(this)[0].id
                $("#shop>span")[0].setAttribute("data-id",attr)
                $(".shop_detail_ul").hide();
                ajax();
            })
    })
    //区域
    rep('http://mmb.ittun.com/api/getgsshoparea',
        "area_mesg",
        $("#area"),
        $(".area_detail_ul"),
        $(".shop_detail_ul"),
        function fun(data){
            $(".area_detail_li").on("click",function(){
                var str=$(this)[0].innerText.substring(0,2)
                 $("#area>span").text(str);
                //$("#area>span")[0].id=$(this)[0].id
                var attr=$(this)[0].id
                $("#area>span")[0].setAttribute("data-id",attr)
                $(".area_detail_ul").hide();
                console.log();
                ajax();
            })
        })

    //ajax请求商品信息
    function ajax(){
        $.ajax({
            //async:false,
            url:'http://mmb.ittun.com/api/getgsproduct',
            data:{'shopid':$("#shop>span")[0].getAttribute("data-id"),'areaid':$("#area>span")[0].getAttribute("data-id")},
            success:function(data){
                var html=template("wares_details",data);
                $(".shop_box_ul").html(html);
            }
        })
    }
    ajax();

})