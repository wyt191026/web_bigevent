$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登陆？', { icon: 3, title: '退出' }, function (index) {
            // 1.清空本地存储数据
            localStorage.removeItem('token')
            // 2.返回登陆界面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //后台中获取验证信息
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar 函数渲染用户信息
            renderAvatar(res.data)
        }
      
    })
}

function renderAvatar(user) {
    //设置用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}