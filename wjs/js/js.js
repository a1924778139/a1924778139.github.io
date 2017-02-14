/**
 * Created by hasee on 2016/12/1.
 */
$(function()
{
    function resize()
    {

        var winht=$(window).width();
        var issmallscreen=winht<768
        $(".item").each(function(index,a)
        {
            var imgsrc=$(a).data(issmallscreen?"image-xs":"image-lg")
            $(a).css({"backgroundImage":'url('+imgsrc+')'});
            if(issmallscreen)
            {
                $(a).html("<img src="+imgsrc+">")
            }else{
                $(a).html(" ")
            }
        })
    }
    resize()
   $(window).on("resize",resize)


        var ul_width=$(".nav-tabs")
        var width=0
        ul_width.children().each(function(index,ele)
        {

            width=ele.clientWidth+width
        })
        ul_width.css("width",width)
})