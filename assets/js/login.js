$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从 layui 获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify()函数自定义校准规则
    form.verify({
        //密码校准
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码校准
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })
    //添加submit监听事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // $.post('http://ajax.frontend.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
        //     if(res.status !=0){
        //         return console.log(res.message);
        //     }
        //     console.log('注册成功');
        // })   
        var data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: data,
            success(res) {
                if(res.status != 0){
                    return layer.msg(res.message)
                }
 
                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $(this).serialize(),
            success(res){
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})