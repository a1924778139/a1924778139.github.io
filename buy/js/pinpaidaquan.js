/**
 * Created by Dc on 2017/1/11.
 */
$(function () {
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandtitle",
        success: function (data) {
            var html = template("listtitle", data);
            $("#list_group").html(html);
            $("#list_group a").on("click", function () {
                window.location = "shidapinpai.html?id=" + this.dataset.id;
                sessionStorage.setItem("fl", $(this).text());
            })
        }
    });
});