/**
 * Created by Administrator on 2017/1/12.
 */
$(function(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getsitenav",
        success:function(data){
            console.log(data);
            var html=template("daohang",data);
            $(".nn").html(html);
        }
    })
})