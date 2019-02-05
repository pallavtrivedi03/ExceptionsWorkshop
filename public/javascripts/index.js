var UserTabs = Object.freeze({
    "Login": 1,
    "Register": 2,
    "Logout": 3
})

var onUserTabClick = (usertab) => {
    var tab = UserTabs[usertab.getAttribute('data-tab')]; //parseInt(usertab.getAttribute('data-tab'));
    var usersection = document.getElementById('user-section');
    usersection.style.display = 'block';
    var userTabs = document.getElementsByClassName('user-tab');
    for (var i = 0; i < userTabs.length; i++) {
        var element = userTabs[i];
        element.classList.remove('user-tab-active');
    }
    var form = document.getElementById('lrform');
    var psw2lbl = document.getElementById('psw2lbl');
    var psw2 = document.getElementById('psw2');
    var fpbox = document.getElementById('fpbox');
    switch (tab) {
        case UserTabs.Register:
            form.setAttribute('data-form-type', UserTabs.Login);
            psw2lbl.style.display = 'block';
            psw2.style.display = 'block';
            fpbox.style.display = 'none';
            break;
        case UserTabs.Login:
            form.setAttribute('data-form-type', UserTabs.Register);
            psw2lbl.style.display = 'none';
            psw2.style.display = 'none';
            fpbox.style.display = 'block';
            break;
        case UserTabs.Logout:
            form.setAttribute('data-form-type', UserTabs.Logout);
            break;
    }
    usertab.classList.add('user-tab-active');
    document.getElementById("uname").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("psw2").value = "";
};

var onUserSectionCloseClick = (close) => {
    var usersection = document.getElementById('user-section');
    usersection.style.display = 'none';
    var userTabs = document.getElementsByClassName('user-tab');
    for (var i = 0; i < userTabs.length; i++) {
        var element = userTabs[i];
        element.classList.remove('user-tab-active');
    }
};

var onLoginRegisterFormSubmit = (form) => {
    var tab = UserTabs[form.getAttribute('data-form-type')];
    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;
    var password2 = document.getElementById("psw2").value;

    if (tab == UserTabs.Login) {
       
    } else if (tab = UserTabs.Register) {

    }
    return true;
};