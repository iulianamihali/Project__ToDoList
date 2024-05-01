function validateEmail(email)
{
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);
    return isValid;
}

function validatePassword(password)
{
    if(password.length < 6)
        return false;
    return true;
}

function validateUsername(username)
{
    if(username.length < 5)
        return false;
    return true;
}

function onchangeLoginInput()
{
    let loginInput = document.getElementById("loginInput").value;
    let ind = document.querySelector("#login_validation.inputBox i");
    if(!loginInput || loginInput?.length === 0) //?->nullcheck
    {
        ind.style.background = 'red';
        eroare.textContent = " Enter Email / Username";
        eroare.style.color = 'red';
    }
    else if(loginInput.includes('@'))
    {
       let check = validateEmail(loginInput);
       if(check === false)
       {
           ind.style.background = 'red';
           eroare.textContent = "Please enter a valid email adress";
           eroare.style.color = 'red';
       }
       else
       {
           if(check === true)
           {
               ind.style.background = 'green';
               eroare.textContent = "";
           }
       }

    }
    else
    {
        let check = validateUsername(loginInput);
        if(check === false)
        {
            ind.style.background = 'red';
            eroare.textContent = "Min. 5 characters";
            eroare.style.color = 'red';
        }
        else
        {
            if(check === true)
            {
                ind.style.background = 'green';
                eroare.textContent = "";
            }
        }


    }

}


function onchangeEmail()
{
    let valueEmail = document.getElementById("valueEmail").value;
    const valueReturn = validateEmail(valueEmail);
    let ind = document.querySelector("#email_validation.inputBox i");
    if(valueReturn === false)
    {
       ind.style.background = 'red';
       // alert("Please enter a valid email adress");
       eroare.textContent = "Please enter a valid email adress";
       eroare.style.color = 'red';
    }
    else
    {
        if(valueReturn === true)
            ind.style.background = 'green';
        eroare.textContent="";


    }

}

function onchangePassword()
{
    let valuePassword = document.getElementById("valuePassword").value;
    const valueReturn = validatePassword(valuePassword);
    let ind = document.querySelector("#password_validation.inputBox i");
    if(valueReturn === false)
    {
        ind.style.background = 'red';
        eroareP.textContent =  "Min. 6 characters";
        eroareP.style.color = 'red';
    }
    else
    {
        if(valueReturn === true)
            ind.style.background = 'green';
        eroareP.textContent = "";
    }

}

function onchangeUsername()
{
    let valueUsername = document.getElementById("valueUsername").value;
    const valueReturn = validateUsername(valueUsername);
    let ind = document.querySelector("#username_validation.inputBox i");
    if(valueReturn === false)
    {
        ind.style.background = 'red';
        eroareU.textContent = "Min. 5 characters";
        eroareU.style.color = 'red';
    }
    else
    {
        if(valueReturn === true)
            ind.style.background = 'green';
        eroareU.textContent = "";
    }
}

