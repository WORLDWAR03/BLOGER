//signup functions




function doSignup(){
    let formData ={}
    formData.name=document.getElementById("firstName").value
    formData.lastName=document.getElementById("lastName").value
    formData.email=document.getElementById("email").value
    formData.password=document.getElementById("password").value
    
console.log(formData)

fetch('/register',{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
}).then((response)=>response.json())
.then((data)=>{
    window.location.href='/'
    console.log(data.signup);
})

}

// dologin


function doLogin(){
    let loginData={}
    loginData.email=document.getElementById('email').value
    loginData.password=document.getElementById('password').value
    fetch('/login',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
        
    }).then((response)=>response.json())
    .then(data=>{
      if(data.login){
        window.location.href='/home'
      }else{
        document.getElementById('warning').innerHTML="invalid credentials"
        setTimeout(() => {
            document.getElementById('warning').innerHTML=""
        }, 3000);
      }
    })
}

const logout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')

}




//input fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
//form
const form =document.getElementById('myForm');


// form.addEventListener('submit',e =>{
//     e.preventDefault();
//     validateForm();
// })
// validation colors



const green = '#4CAF50';
const red = '#F44336';

//handle form

const validateForm=()=>{
validateFirstName();
validateLastName();
validatePassword();
validateConfirmPassword();
validateEmail();

if(validateFirstName()&& validateLastName()&& validatePassword()&& validateConfirmPassword()&& validateEmail()){
    return true;
}else {
    
    return false;
}


}






//validaters
function validateFirstName() {
    //check if is empty
    if(checkIfEmpty(firstName)) return;
    //is if it as only letters
    if(checkIfOnlyletters(firstName)) return;
    return true;
};

function validateLastName(){
    if (checkIfEmpty(lastName)) return;
    if(!checkIfOnlyletters(lastName)) return;
    return true;
};

function validatePassword() {
    if(checkIfEmpty(password)) return;
    if(!meetLength(password, 8, 12)) return ;
    if(!containsCharacters(password, 4)) return;
    return true;
    
};

function validateConfirmPassword(){
    // if(password.className !== ''){
    //     setInvalid(confirmPassword, 'Password must be valid');
    //     return;
    // }

    if(password.value !== confirmPassword.value){
        setInvalid(confirmPassword, 'Passwords must match');
        return;
    }else {
        setInvalid(confirmPassword,'');
    }
    return true;
};
function validateEmail(){
    if(checkIfEmpty(email)) return;
    if(!containsCharacters(email, 5)) return;
    return true;
};

//utility functions

function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        //set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;



    }else
        //set field valid
       {
        setValid(field, `${field.name}  `);
     return true;
       }
}

function isEmpty(value){
    if(value === '') return true;
    return false;
}

function setInvalid(field, message){
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;

}

function setValid(field){
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    field.nextElementSibling.style.color = green;
    
}

function checkIfOnlyletters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    }
else{
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
}
}
function meetLength(field, minLength, maxLength){
    if(field.value.length >= minLength && field.value.length < maxLength){
        setInvalid(field);
        return true;
    } else if(field.value.length < minLength){
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
    }else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`);
        return false
    }
}

function containsCharacters(field, code){
    let reGex;
    switch(code){
        case 1:
            //letters
            reGex = /(?=.*[a-zA-Z])/;
            return matchWithReGex(reGex, field, 'Must contain at least one letter');
        
        case 2:
           // letters and numbers
           reGex = /(?=.*\d)(?=.*[a-zA-Z])/;
           return matchWithReGex(reGex, field, 'Must contain at least one letter and one number');
        case 3:
           // At least one uppercase letter, one lowercase letter and one number
           reGex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
           return matchWithReGex(reGex, field, 'Must contain at least one uppercase letter, one lowercase and one number');
        case 4:
           // At least one uppercase letter, one lowercase letter, one number and one special character (symbol)
           reGex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
           return matchWithReGex(reGex, field, 'Must contain at least one uppercase, one lowercase letter, one number and one special character');

        case 5:
            //email
            reGex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithReGex(reGex, field, 'Must be a valid Email address');

        default:
            return false;


    }
    
}
function matchWithReGex(reGex, field, message){
    if(field.value.match(reGex)){
        setInvalid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}


//login functions

