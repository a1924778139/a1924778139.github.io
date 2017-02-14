function ajax(url,callback){
    $.ajax({
        url:url,
        datatype:'json',
        type:'get',
        success:function(data){
            callback(data);
        }
    })
}
