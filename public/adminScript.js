


//SELECTED IMAGE VIEW







const showImages =()=>{
    const imagesInput=document.getElementById('imageInput')
    const imagePreview=document.getElementById('imagePreview')
    document.getElementById('imagePreview').innerHTML=null
    const selectedImages=imagesInput.files 
      for (let i = 0; i < selectedImages.length; i++) {
                const image=document.createElement('img')
                image.src=URL.createObjectURL(selectedImages[i])
                image.style.width="150px"
                image.style.margin="3px"
                imagePreview.appendChild(image)
                
            }


    }
    
   
    
    //ADMIN LOGIN

    function adminLogin(){
      let loginData={}
      loginData.email=document.getElementById('email').value
      loginData.password=document.getElementById('password').value
      fetch('admin/adminLogin',{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(loginData)
          
      }).then((response)=>response.json())
      .then(data=>{
        if(data.login){
          window.location.href='/admin/uploads'
        }else{
          document.getElementById('warning').innerHTML="invalid credentials"
          setTimeout(() => {
              document.getElementById('warning').innerHTML=""
          }, 3000);
        }
      })
  }

  //ADMIN LOGOUT

  const logout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')

}

//DELETE BLOG


function deletePosts(postId){

 fetch('/admin/deletePost',{
  method:'delete',
  headers:{
    'Content-Type':'application/json'
  },

  body:JSON.stringify({postId:postId})
 })
 .then((res)=>res.json())
 .then((response)=>{
  if(response.delete){
    location.reload()
  }else{
    alert('someting went wrong')
  }
 })
}


function deleteUser(userId){
  fetch('/admin/deleteUser',{
    method:'delete',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({userId:userId})
  }).then((res)=>res.json())
  .then((respose)=>{
    if(respose.delete){
      location.reload()
    }else{
      alert('something went wrong')
    }
  })
}








  