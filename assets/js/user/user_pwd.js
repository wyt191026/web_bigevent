$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd : function(value){
            if(value === $('[name=oldPwd]').val()){
                return  '新旧密码不能相同'
            }
        },
        rePwd : function(value){
            if(value !==$("[name=newPwd]").val()){
                return '新密码两次输入不相同'
            }
        }
        
    })

    //密码表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url : '/my/updatepwd',
            type : 'POST',
            data : $(this).serialize(),
            success(res){
                if(res.status !==0){
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功')
                //重置表单 
                $('.layui-form')[0].reset()
            }
        })
    })
})