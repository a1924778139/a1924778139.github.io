/**
 * Created by hasee on 2017/1/13.
 */
$(function(){
    ajax("http://mmb.ittun.com/api/getindexmenu",
        function(data){
            var html=template("sort_li",data)
            $(".sort_ul").html(html);
            //console.log($(".sort_li:nth-child(n+9)"));
            //���ص�li
            var hide_li=$(".sort_li:nth-child(n+9)");
            hide_li.css("opacity","0");
            hide_li.css("transform","translate(-100px,0)");
            //������ఴť
            $(".sort_li:nth-child(8)")[0].onclick=function(){
                if(hide_li.css("opacity")==0){
                    //��������б�
                    $(".sort_ul").css("height","278px");
                    hide_li.css("transform","translate(0,0)");
                    hide_li.css("opacity","1");
                }else{
                    //����ջ��б�
                    hide_li.css("opacity","0");
                    hide_li.css("transform","translate(-100px,0)");
                    $(".sort_ul").css("height","190px");
                }

            }
        })
    ajax("http://mmb.ittun.com/api/getmoneyctrl",
            function(data){
                var html=template("warea_li",data)
                $(".warea_ul").html(html);
                var result=data.result;
                //ѭ��ȡ������
                // console.log(result)
                var arr=[]
                for(var i=0;i<result.length;i++){
                    var says=result[i].productComCount;
                    var str=says.replace(/[^0-9]+/g, '')
                    // arr.push(says);
                    console.log(str);
                   document.getElementsByClassName("says")[i].innerText=str
                }

               // var str= String(arr);
               // console.log(str)
               //  //ȡ�����ַ�������
               // var num= str.replace(/[^0-9]+/g, '');
               //  var num=num.split("")
               //  // console.log(num);
               //  for(var i=0;i<num.length-1;i++){
               //     console.log(num[i]);
               //     document.getElementsByClassName("says")[i].innerText=num[i]
               // }
            })
})
