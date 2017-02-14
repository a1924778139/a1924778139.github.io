$(function () {
    var page=1,totalPage;
    //页面加载时请求数据
    $.ajax({
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        dataType: 'jsonp',
        success: function (data) {
            var html = template('tmp', data);
            $('#con').html(html);
            //缓存页数(设为全局变量)，以后不会重新加载，如果每次请求数据，页数也重新加载的话，会一直显示第一页
            totalPage = Math.ceil(data.totalCount / data.pagesize);
            if ($('#selectPage').html() !== '') {
                $('#selectPage').html('');//如果之前有option了，清空
            }
            for (var i = 0; i < totalPage; i++) {
                var option = document.createElement('option');
                option.value = i + 1;
                option.innerHTML = (i + 1) + '/' + totalPage;
                $('#selectPage')[0].appendChild(option);
            }
            $('.product').on('click',function(){
                location.href = 'productdetail.html?productid='+ $(this).attr('id');//跳转到新页面，传参，根据参数显示对应的商品详情
            });
        }
    });
    //下拉框change事件
    $('#selectPage').on('change', a);
    //封装
    function a() {
        page = $('#selectPage').val();
        $.ajax({
            url: 'http://mmb.ittun.com/api/getmoneyctrl',
            data: {pageid: page},
            dataType: 'jsonp',
            success: function (data) {
                var html = template('tmp', data);
                $('#con').html(html);
            }
        });
    }

    //点击上一页回到上一页
    $('#before').on('click', function () {
        if (page > 1) {
            page--;
            $('#selectPage').children().removeAttr("selected");
            $('#selectPage')[0].children[page - 1].setAttribute('selected', 'selected');
        }
        a();
    });
    //点击下一页回到下一页
    $('#next').on('click', function () {
        if (page < totalPage) {
            page++;
            $('#selectPage').children().removeAttr("selected");
            $('#selectPage')[0].children[page - 1].setAttribute('selected', 'selected');
        }
        a();
    });
});