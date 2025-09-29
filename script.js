const form=document.getElementById("register-form")
const username=document.getElementById("username")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirmPassword=document.getElementById("Confirm Password")


function formatFieldName(input)
{
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function checkLength(input,min,max)
{
    if(input.value.length<min)
    {
        showError(input,formatFieldName(input)+" must be at least "+min+" characters.");
        return false;
    }
    else if(input.value.length>max)
    {
        showError(input,formatFieldName(input)+" must be less than "+max+" characters");
        return false;
    }
    else
    {
        showSuccess(input);
        return true;
    }
}

form.addEventListener("submit",function(e)
{
    e.preventDefault();
    const isRequriedValid=checkRequired([username,email,password,confirmPassword]);
    let isFormvalid=isRequriedValid;
    if(isRequriedValid)
    {
        const isUsernameValid=checkLength(username,3,15);
        const isEmailValid=checkEmail(email);
        const isPasswordValid=checkLength(password,6,25);
        const isPasswordsMatch=checkPasswordMatch(password,confirmPassword);

        isFormvalid=isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    if(isFormvalid)
    {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach((group)=>{
            group.className="form-group";
        })
    }
})

function checkRequired(inputArray)
{
    let isValid=true;

    inputArray.forEach((input)=>{
        if(input.value.trim()==="")
        {
            showError(input,formatFieldName(input)+" is required");
            isValid=false;
        }
        else
        {
            showSuccess(input);
        }
    });
    return isValid;
}




function checkEmail(email)
{
    const emailRegex=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(emailRegex.test(email.value.trim()))
    {
        showSuccess(email);
        return true;
    }
    else
    {
        showError(email,"Email is not valid");
        return false;
    }
}

function checkPasswordMatch(input1,input2)
{
    if(input1.value!==input2.value)
    {
        showError(input2,"Passwords do not match");
        return false;
    }
    return true;
}

function showError(input,message)
{
    const formGroup=input.parentElement;
    formGroup.className="form-item error";
    const small=formGroup.querySelector("small");
    small.innerText=message;
}

function showSuccess(input)
{
    const formGroup=input.parentElement;
    formGroup.className="form-item success";
}