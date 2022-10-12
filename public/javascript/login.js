const login=async()=>{
    const email=document.getElementById('Username').value;
    const password=document.getElementById('password').value;
    const body={email,password};
    console.log(body);
    const response=await fetch('/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.json();
    console.log(result);
    console.log(result);
    if(result.status==='done')
    {
        console.log('Done');
        window.location.href='/';
        
    }
    else{
        console.log('Error');
    }
    // window.location.href="homepage";
}