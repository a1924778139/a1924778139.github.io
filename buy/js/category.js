/**
 * Created by hasee on 2017/1/15.
 */
$(function(){
    ajax("http://mmb.ittun.com/api/getcategorytitle",
        function(data){
            var html=template("category_title_one",data)
            $("#title").html(html);
            $(".category_li_one").on("click",function(){
                //�����a��ǩ��id��ȡ
                var id=$(this).children()[0].getAttribute("data-id")
                var $that=$(this)
                $.ajax({
                    url:"http://mmb.ittun.com/api/getcategory",
                    data:{"titleid":id},
                    success:function(data){
                        var html=template("category_title_two",data)
                        //����λ��
                        var $next_ul=$that.parent().next();
                        //��������
                        $next_ul.html(html);
                        //���Ԫ�ص������б���ʾ����������
                        if($next_ul.css("height")=="auto"){
                            $next_ul.css({"opacity":"0","height":"0px"});
                        }else{
                            $(".category_ul_two").css({"opacity":"0","height":"0px"});
                            $next_ul.css({"height":"auto","opacity":"1"});
                        };
                        //�����Ʒ
                        $(".category_li_two").on("click",function(){
                            var shop_id=$(this)[0].getAttribute("data-categoryid");
                            window.location.href="./productlist.html?"+shop_id
                        });
                    }
                })
            })
        })

})