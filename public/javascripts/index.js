/**
 * @Author: yunfei_bai
 * @Date: 2018/7/18 14:39
 * @Description:
 * */
$(function () {
    var indexObj = {
        init:function () {
            this.buttonClick();
            this.getUserList();
        },
        buttonClick:function () {
            $('body').off('click.button').on('click.button','button.button',function () {
                $.ajax({
                    url:'/changeKeyWord',
                    type:'post',
                    data:{
                      keyWord:'你好',
                      answer:'我是Sakura'
                    },
                    dataType:'json',
                    success:function (res) {
                        console.log(res)
                    }

                })
            })
        },
        //获取关注用户列表
        getUserList:function () {
            $('#table').bootstrapTable({
                url: '/userList',
                columns: [{
                    field: 'nickname',
                    title: '用户昵称'
                }, {
                    field: 'city',
                    title: '地区'
                }, {
                    field: '关注时间',
                    title: 'subscribe_time'
                }, ]
            });
        }
    }
    indexObj.init();
});