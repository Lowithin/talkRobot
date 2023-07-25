const loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val) return '登录名不能为空';
    const resp = await API.exists(val);
    if(resp.data) return '该账号名已被占用,请重新选择';
});

const nicknameValidator = new FieldValidator('txtNickname', function(val){
    if(!val) return '昵称不能为空';
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function(val){
    if(!val) return '密码不能为空';
})

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function(val){
    if(!val) return '确认密码不能为空';
    if(val != loginPwdValidator.input.value) return '两次输入的密码不一致';
})

const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await FieldValidator.validateAll(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    )
    if(!result){
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const resp = await API.register(data);
    if(resp.code === 0){
        alert('注册成功,点击确定跳转到登陆页面');
        location.href = './login.html';
        }
    // const resp = await API.register(
    //     // {
    //     //     loginId : loginIdValidator.input.value,
    //     //     loginPwd : loginPwdValidator.input.value,
    //     //     nickname : nicknameValidator.input.value
    //     // }
    // )
}