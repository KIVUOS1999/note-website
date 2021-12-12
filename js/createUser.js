const button = document.getElementById('adduser')
button.addEventListener('click', ()=>{
    if(document.getElementById('password').value != document.getElementById('password-confirmation').value){
        alert("password not match")
        return
    }

    user = { 
        "id": document.getElementById('username').value, 
        "pass": document.getElementById('password').value
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }
    
    let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/add-user", options);
    fetchRes.then(res =>res.json()).then(d => {
        if (d.msg == "User Id already present"){
            alert("pick a different username")
        }
        else{
            url = location.href
            url = url.split('/')
            url[url.length - 1] = "login.html"
            url = url.join('/')
            location.replace(url)
        }
    })
})
