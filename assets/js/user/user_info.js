$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须是1~6个字符'
            }
        }
    })

    //初始化用户的基本信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return '获取用户信息失败'
                }

                //通过form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置用户信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //更新用户信息

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //调用父页面中的方法
                window.parent. getUserInfo()
            }
        })
    })

})