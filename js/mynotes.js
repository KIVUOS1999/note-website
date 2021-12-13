curr_user = localStorage.getItem('user')
console.log(curr_user)
if (curr_user == "None" || curr_user == null) {
    url = location.href
    url = url.split('/')
    url[url.length - 1] = "login.html"
    url = url.join('/')
    location.replace(url)
}

user_name = document.getElementById('user-name')
sp = document.createElement('span')
node = document.createTextNode(curr_user)
sp.appendChild(node)
user_name.appendChild(sp)

data = {
    'id': curr_user
}

let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
}

let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/get-notes", options);
fetchRes.then(res => res.json()).then(d => {
    decorate(d)
})

decorate = (d) => {
    outer = document.getElementById("available-notes")
    for (i = 0; i < d.length; i++) {
        para = document.createElement("p")
        div = document.createElement("div")
        div.setAttribute("id", "data-" + d[i]._id)
        node = document.createTextNode(d[i].data)

        node_del = document.createElement("button")
        node_del.innerHTML = "Delete"
        node_del.classList.add("delete")
        node_del.setAttribute("id", d[i]._id)
        node_del.addEventListener("click", (e) => {
            data = {
                'id': e.target.id,
            }

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }

            let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/delete-note", options);
            fetchRes.then(res => res.json()).then(d => {
                location.reload()
            })
        })


        node_edit = document.createElement("button")
        node_edit.innerHTML = "Edit"
        node_edit.setAttribute("id", "edit-" + d[i]._id)
        node_edit.addEventListener("click", (e) => {
            a = "data-" + e.target.id.split('-')[1]
            text_area = document.getElementById(a)
            prev_text = text_area.innerHTML
            text_area.innerHTML = `
            <input type=text, id=edit-box-${e.target.id.split('-')[1]} value="${prev_text}"}></input>
            <button id = edit-box-done-${e.target.id.split('-')[1]}, onclick = "update('${e.target.id.split('-')[1]}')">Done</button>
            `
        })
        div.appendChild(node)
        para.appendChild(div)
        para.appendChild(node_del)
        para.appendChild(node_edit)
        outer.appendChild(para)
    }
}

update = (id) => {
    user = {
        "id": `${id}`,
        "data": document.getElementById(`edit-box-${id}`).value
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }

    let fetchRes = fetch(url = "https://knote-app-api.herokuapp.com/update-particular-notes", options);
    fetchRes.then(res => res.json()).then(d => {
        alert(d.data)
        location.reload();
    })
}