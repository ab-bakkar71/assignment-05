// get The element
document.getElementById('input-btn').addEventListener('click', function(even){
    even.preventDefault();
    // get the input value
    const inputUserName = document.getElementById('input-username');
    const userName = inputUserName.value;
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    

    // Login conation
    if(userName == "admin" && password == "admin123"){
        alert('SingIn Success');
        window.location.assign('./main.html')
    }
    else{
        alert('SingIn Failed')
        return;
    }
});
