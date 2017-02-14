/**
 * Created by Dc on 2017/1/11.
 */
$(function () {
    var url = window.location.href;
    url = url.substr(url.indexOf("=") + 1);
    $(".title").text(sessionStorage.getItem('fl'));
    //总排行榜
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrand",
        data: {brandtitleid: url},
        success: function (data) {
            var html = template("phbatr", data);
            $("#phb").html(html);

        }
    });
    //销量排行
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandproductlist",
        data: {brandtitleid: url},
        success: function (data) {
            var html = template("xlatr", data);
            $("#xlph").html(html);
        }
    });
    //最新评论
    $.ajax({
        url: "http://mmb.ittun.com/api/getproductcom",
        data: {productid: url},
        success: function (data) {
            var html = template("zxplatr", data);
            $("#zxpl").html(html);
            //这里的评论针对的是销量排行第一的，所以图片和名字都是第一的
            $("#zxpl img").attr("src", $("#xlph img")[0].getAttribute("src"));
            $("#zxpl p.tit").text($("#xlph .content h3").text());
        }
    });
})
;