isAuth();
    async function isAuth(){
      let div=document.getElementById('loginbutton');
      let buffer=await fetch('/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
      })
      const ans=await buffer.json();
      if(ans.status)
      {
        div.innerHTML=`        
        <a onclick="window.location.href='/'">DashBoard</a>
      
      `
        
      }
      else{
        div.innerHTML=`
        <a onclick="window.location.href='/login'">LogIn / SignUp</a>
      `
      }
    }

async function signout(){
  let response=await fetch("/user/signout",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    }
  })
  let url=window.location.href;
  window.location.href=url
}