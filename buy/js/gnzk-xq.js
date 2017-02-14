$(function(){
    var id = getQueryString('productid');//接收商品列表页传递的商品id
    console.log(id);
    $.ajax({
        url:'http://mmb.ittun.com/api/getdiscountproduct',
        data:{productid:id},//向后台传递id
        dataType:'jsonp',
        success:function(data){
            var html = template('tmp',data);
            $('#intro_box').html(html);
        }
    })
    //封装的方法
    function getQueryString(key){
        var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    }
});