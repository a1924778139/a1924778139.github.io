/**
 * Created by hasee on 2017/1/11.
 */
var x=window.location.search;
x= x.substr(1)
window.onload=function(){
    $.ajax({
        type:'get',
        datatype:'json',
        url:'http://mmb.ittun.com/api/getcouponproduct',
        data:{'couponid':x},
        success:function(data2){
            var html=template("cheap2",data2)
            $("#kfc_list").html(html)
            var arr=data2.result;
            var mes=[];

            //forѭ��ȡ��img��ǩ��������
            for(var i=0;i<arr.length;i++){
                mes.push(arr[i].couponProductImg)
            }
            console.log($(".kfc_box"));
            //�����ǩ�õ��ñ�ǩ����ͼƬ��·��
            $(".kfc_box").on("click",function(){
                var img=$(this).children().children().children().children()[0];
                var obj={img:img};
                var imgstr=obj.img.outerHTML;
//                    ��ȡ�ַ����������е�λ��
                var index;
                for(var i=0; i<mes.length; i++){
                    if(imgstr== mes[i]){
                        index = i;
                        break;
                    }
                }
                $(".blur_bgbox").css("display","block");
                $("body").css("overflow","hidden")
                //��ʾ�����ͼ
                $(".img_box")[0].innerHTML=imgstr;
                $(".arr_right").on("click",function(){
                    index++;
                    if(index>mes.length-1){
                        index=0
                    }
                    $(".img_box").html(mes[index])
                });
                $(".arr_left").on("click",function(){
                    index--;
                    if(index<0){
                        index=mes.length-1;
                    }
                    $(".img_box").html(mes[index])
                })
                //���ȡ��ģ̬��
                $("i").on("click",function(){
                    $(".blur_bgbox").css("display","none");
                    $("body").css("overflow","auto");
                })
            })
        },
    })
}
