async function signup(){
    var user=new Object();
    user.name = document.getElementById('name').value;
    user.email=document.getElementById('Email').value;
    user.password=document.getElementById('Password').value;
    user.city=document.getElementById('city').value;
    console.log(user);
    await fetch('/user/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    window.location.href="/";
}