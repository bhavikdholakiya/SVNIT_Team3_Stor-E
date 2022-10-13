const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

async function getproduct(req, res){
    let product = await fetch('/u',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })    
}

let star = document.querySelectorAll('input');
let showValue = document.querySelector('#rating-value');
let value;

for (let i = 0; i < star.length; i++) {
  star[i].addEventListener('click', function() {
    i = this.value;

    showValue.innerHTML = i + " out of 5";
    value=i;
  });
}
async function uploadComments(id){
    let reviews=document.getElementById('ureview').value;
    let obj={
        reviews,
        rating:value
    }
    let url="/product/uploadcomments?id="+id+"&sort=1";
    console.log(obj);
    const response=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(obj)
    });
    const result=await response.json();

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
