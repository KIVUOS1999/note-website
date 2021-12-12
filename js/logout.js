logout_btn = document.getElementById("logout")
logout_btn.addEventListener('click', ()=>{
    localStorage.setItem('user', 'None')

    url = location.href
    url = url.split('/')
    url[url.length - 1] = "login.html"
    url = url.join('/')
    location.replace(url)

    alert("Adious amigo")
})
