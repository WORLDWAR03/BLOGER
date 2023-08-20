






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