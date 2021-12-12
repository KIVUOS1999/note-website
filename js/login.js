const button = document.getElementById('authenticate')
button.addEventListener('click', ()=>{
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
    
    let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/authenticate", options);
    fetchRes.then(res =>res.json()).then(d => {
        if(d.id != null){
            localStorage.setItem("user", d.id)
            alert("Login successfully")
            url = location.href
            url = url.split('/')
            url[url.length - 1] = "mynotes.html"
            url = url.join('/')
            location.replace(url)
        }else{
            localStorage.setItem("user", "None")
            alert(d)
        }
    })
})
