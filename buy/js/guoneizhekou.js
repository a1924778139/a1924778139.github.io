/**
 * Created by Dc on 2017/1/11.
 */
$(function () {
    //保存数据的变量
    var Data;
    //获取数据函数
    function getData(callback) {
        if (Data) {
            callback && callback(Data);
            return;
        }
        $.ajax({
            url: "http://mmb.ittun.com/api/getinlanddiscount",
            success: function (data) {
                //缓存下来
                Data = data;
                callback(Data);
                //检测一下
                console.log("发送了1次报文");
            }
        });
    }

    //第一次，渲染页面函数
    getData(function (Data) {
        var arr = Data.result.splice(0, 10);
        //先渲染10个,传递的参数最好是对象，因为模板可以直接用对象的键
        var html = template("listart", {arr: arr});
        $("#list").html(html);
        $("#list a").on("click", function () {
            window.location = "inlanddiscount-xq.html?productid=" + this.dataset.id;
        });
    });
    //以后再渲染应在滑动到底部之后
    $(document).on("scroll", function () {
        var pagHeight = $(document).height();
        var windowHeight = $(window).height();
        //滑到了底部
        if (window.pageYOffset + windowHeight >= pagHeight - 100) {
            getData(function () {
                //每次4个4个渲染
                var arr = Data.result.splice(0, 4);
                var html = template("listart", {arr: arr});
                $("#list").append(html);
            });
        }
        //console.log(windowHeight + "窗口高度");
        //console.log(window.pageYOffset + "卷动值");
        //console.log(pagHeight + "页面高度");
        //console.log(window.pageYOffset + windowHeight + "卷动值加窗口高度");
    })
});
