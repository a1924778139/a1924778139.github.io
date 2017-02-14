/**
 * Created by hasee on 2017/1/15.
 */
$(function(){
    var categoryid=window.location.search.substr(1);
    function ajax(url,data,callback){
        $.ajax({
            url:url,
            data:data,
            success:function(data){
                callback(data)
            }
        })
    }
    //top��ajax
    ajax("http://mmb.ittun.com/api/getcategorybyid",{"categoryid":categoryid},
        function(data){
            //top���������������仯���仯
            $(".top_nav_left>span:nth-child(3)").html(data.result[0].category)
        })
    //��Ʒ����ajax
    ajax("http://mmb.ittun.com/api/getproductlist",{"categoryid":categoryid,"pageid":"1"},
        function(data){
            console.log(data);
            var html=template("shop_title",data);
            $(".shop_title_ul").html(html)
            //����ҳ�����

            //ҳ������
            page_num=Math.ceil((data.totalCount)/(data.pagesize));
            //ѭ��-1�����ҳ��
            var div="";
            for(var i=1;i<=page_num;i++){
                div+="<div class='page'>"+
                    "<span class='page_one'>"+i+"</span>"+
                    "<span>/</span>"+
                    "<span class='page_two'>"+page_num+"</span>"+
                    "</div>"
            }
            $(".page_one").html(i)
            $(".page_li").html(div)
            $(".page:nth-child(1)").css("display","block").siblings().css("display","none")
            //�����ȡ��ǰҳ��
            $(".page").on("click",function(){
                now_page=$(this)[0].firstElementChild.innerText;
                    ajax("http://mmb.ittun.com/api/getproductlist",{"categoryid":categoryid,"pageid":now_page},
                        function(data){
                            var html=template("shop_title",data);
                            $(".shop_title_ul").html(html);
                        })
                if($(this).siblings().css("display")=="block"){
                    $(".page").css("display","none");
                    $(this).css("display","block")
                }else if($(this).css("display")=="none"){

                    $(".page").css("display","none");
                    $(this).css("display","block")
                }
                else{
                    $(".page").css("display","block")
                }

            })

            //�����һҳ
            $(".add_page").on("click",function(){
                //��ȡ����dispaly block��Ԫ��
                for(var i=0;i<$(".page").length;i++){
                    if($(".page")[i].style.display=="block"){
                        var dipblk=$(".page")[i]
                    }
                }
                //��ȡblockԪ���µ�����ҳ��
                var add_num=dipblk.firstElementChild.innerHTML;
                add_num--;
                if(add_num>=0){
                    ajax("http://mmb.ittun.com/api/getproductlist",{"categoryid":categoryid,"pageid":add_num},
                        function(data){
                            var html=template("shop_title",data);
                            $(".shop_title_ul").html(html);
                            //�����һҳ�����м䰴ť����¼�
                            document.getElementsByClassName("page")[add_num - 1].click()
                        })
                }
            })
            //�����һҳ
            $(".del_page").on("click",function(){
                //��ȡ����dispaly block��Ԫ��
                for(var i=0;i<$(".page").length;i++){
                    if($(".page")[i].style.display=="block"){
                        var dipblk=$(".page")[i]
                    }
                }
                //��ȡblockԪ���µ�����ҳ��
                var del_num=dipblk.firstElementChild.innerHTML;
                del_num++;
                if(del_num<=page_num){
                    ajax("http://mmb.ittun.com/api/getproductlist",{"categoryid":categoryid,"pageid":del_num},
                        function(data){
                            var html=template("shop_title",data);
                            $(".shop_title_ul").html(html);
                            //�����һҳ�����м䰴ť����¼�
                            document.getElementsByClassName("page")[del_num - 1].click()
                        })
                }

            })
            //�����ת
            $(".shop_title_li").on("click",function(){
                var productid=$(this)[0].getAttribute("data-id");
                window.location.href="./bijia.html?"+productid;
            })
        })

})