/**
 * Created by hasee on 2017/1/15.
 */
$(function(){
    //获取id
    var product_id=window.location.search.substr(1);
    $.ajax({
        url:"http://mmb.ittun.com/api/getproduct",
        data:{"productid":product_id},
        success:function(data){
            //top栏ajax1
            $.ajax({
                url:"http://mmb.ittun.com/api/getcategorybyid",
                data:{"categoryid":data.result[0].categoryId},
                success:function(data){
                    //top导航栏类名随点击变化而变化
                    $(".lei").html(data.result[0].category+">")
                }
            });
            //top栏2
            $(".name").html(data.result[0].productName+">")
            //大品类跳转页面
            $(".lei").attr("href","./productlist.html?"+data.result[0].categoryId);
            var html=template("shop_img",data);
            $(".product_img").html(html)
        }
    })
    //获取评论
    $.ajax({
        url:"http://mmb.ittun.com/api/getproductcom",
        data:{"productid":product_id},
        success:function(data){
            console.log(data);
            var html=template("valuation_li",data);
            $(".valuation_ul").html(html);
        }
    })
})