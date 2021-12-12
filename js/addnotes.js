curr_user = localStorage.getItem('user')

text = document.getElementById('add-notes')
btn = document.getElementById('add')

btn.addEventListener('click', ()=>{
    data = {
        'id': curr_user,
        'data': text.value
    }
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    
    let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/insert-data", options);
    fetchRes.then(res =>res.json()).then(d => {
        text.value = ''
        location.reload()
    })
})
