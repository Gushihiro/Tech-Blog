document.querySelector("#loginForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(fetchObj);
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("logged in successfully!")
            location.reload();
        } else {
            alert("Login failed!")
        }
    })
});

document.querySelector("#signupForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        name:document.querySelector("#signupUsername").value,
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(fetchObj);
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("Signup Successful!")
        } else {
            console.log("Signup failed!")
        }
    })
})