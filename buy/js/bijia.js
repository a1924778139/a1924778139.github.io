/**
 * Created by hasee on 2017/1/15.
 */
$(function(){
    //��ȡid
    var product_id=window.location.search.substr(1);
    $.ajax({
        url:"http://mmb.ittun.com/api/getproduct",
        data:{"productid":product_id},
        success:function(data){
            //top��ajax1
            $.ajax({
                url:"http://mmb.ittun.com/api/getcategorybyid",
                data:{"categoryid":data.result[0].categoryId},
                success:function(data){
                    //top���������������仯���仯
                    $(".lei").html(data.result[0].category+">")
                }
            });
            //top��2
            $(".name").html(data.result[0].productName+">")
            //��Ʒ����תҳ��
            $(".lei").attr("href","./productlist.html?"+data.result[0].categoryId);
            var html=template("shop_img",data);
            $(".product_img").html(html)
        }
    })
    //��ȡ����
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