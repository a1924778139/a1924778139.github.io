/**
 * Created by hasee on 2017/2/10.
 */
$(function(){
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    $(".yx_happy").css("height",clientHeight+"px");
    $("html").css("font-size",10/667*clientHeight+"px")
    //整页滑动封装
    function swiper(ele,height,index,max){
        $(ele).on("touchstart",function(e){
            var touch = e.originalEvent.targetTouches[0];
            y_start=touch.pageY;
            $(this).css("z-index",3)
        });
        $(ele).on("touchmove",function(e) {
            var touch = e.originalEvent.targetTouches[0];
            y_move = touch.pageY;
            var y_cut_one = y_move - y_start
            if (y_cut_one && y_cut_one < 0) {
                if($(this).next().length!=0){
                    //ok
                    $(this).css("z-index", 2).siblings().css("z-index",1).end().next().css({
                        "transition":"none",
                        "z-index": "3",
                        "top":-(index-1)*height+ y_cut_one + "px",
                    })
                }else{
                    //ok
                    $(this).css("z-index", 2).siblings().css("z-index",1).end().siblings('*:first').css({
                        "transition":"none",
                        "z-index": "3",
                        "top":height+y_cut_one + "px",
                    })
                }
            }else if(y_cut_one && y_cut_one > 0){
                if($(this).prev().length!=0){
                    //ok
                    $(this).css("z-index",2).siblings().css("z-index",1).end().prev().css({"z-index":"3",
                        "transition":"none",
                        "top":y_cut_one-(index-1)*height+"px"})

                }else{
                    //ok
                    $(this).css("z-index",2).siblings().css("z-index",1).end().siblings('*:last').css({
                        "transition":"none",
                        "z-index": "3",
                        "top":y_cut_one-max*height+"px",
                    })
                }
            }



            now_page()
        })



        $(ele).on("touchend",function(e){
            var touch = e.originalEvent.changedTouches[0];
            y_end=touch.pageY;
            var y_cut_two=y_end-y_start;
            console.log(y_cut_two);
            if(y_cut_two&&y_cut_two<0){


                if($(this).next().length!=0){
                    //ok
                    $(this).css("top",(1-index)*height+"px").next().css({"transition":"all 1s","top":-height*index+"px"})
                }else {
                    //ok
                    $(this).css("top",(1-index)*height+"px").siblings('*:first').css({"transition": "all 1s", "top":0+ "px"})
                }


            }else{
                if($(this).prev().length!=0){
                    //ok
                    $(this).css("top",(1-index)*height+"px").prev().css({"transition":"all 1s","top":(2-index)*height+"px"})
                }else{
                    //ok
                    $(this).css("top","0px").siblings('*:last').css({"transition":"all 1s","top":-(max-1)*height+"px"})
                }
            }
            y_start=0;
            y_move=0;
            y_end=0;
        })
    }
    swiper(".happy_first",clientHeight ,1,4);
    swiper(".happy_second",clientHeight,2,4);
    swiper(".happy_third",clientHeight ,3,4);
    swiper(".happy_four",clientHeight ,4,4);

    //判断当前页面，并且添加进入时的特效
    function now_page(){
        $("div").each(function(i,v){
            if($(v).css("z-index")=="3"){
                //第一页特效
                if($(v)[0].className=="happy_first"){


                    $(".happy_first").siblings().children().removeClass("scale")
                    $(".first_center_company_name").addClass("scale")
                }
                //第二页特效
                if($(v)[0].className=="happy_second"){
                    $(".happy_second").siblings().children().removeClass("scale")
                    $(".second_left_as").addClass("scale")
                }
                //第三页特效
                if($(v)[0].className=="happy_third"){
                    $(".happy_second").siblings().children().removeClass("scale")
                    $(".distich").addClass("scale").next().addClass("scale").next().addClass("scale")
                }
                //第四页特效
                if($(v)[0].className=="happy_four"){
                    $(".happy_second").siblings().children().removeClass("scale")
                    $(".company").addClass("scale")
                }
            }

        })
    }
    now_page()

    //第三页查看答案
    $(".ask_click").on("click",function(){
        $(".ask").attr("src","images/3-6.png");
        $(".ask_click").attr("src","images/3-7.png").css({"margin-left":"-20px","top":"370px"})
    })


})