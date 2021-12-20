curr_user = localStorage.getItem('user')
if (curr_user == "None" || curr_user == null) {
    url = location.href
    url = url.split('/')
    url[url.length - 1] = "login.html"
    url = url.join('/')
    location.replace(url)
}

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
    decorate(d.data)
    loader = document.getElementById("loader")
    loader.style.display = "none"
})

decorate = (d) => {
    outer = document.getElementById("available-notes")
    for (i = 0; i < d.length; i++) {
        para = document.createElement("div")
        para.setAttribute("class", "para")
        div = document.createElement("div")
        div.setAttribute("id", "data-" + d[i]._id)
        div.setAttribute("class", "data")
        node = document.createTextNode(d[i].data)

        node_del = document.createElement("button")
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
        node_edit.setAttribute("id", "edit-" + d[i]._id)
        node_edit.setAttribute("class", "edit")
        node_edit.addEventListener("click", (e) => {
            a = "data-" + e.target.id.split('-')[1]
            text_area = document.getElementById(a)
            prev_text = text_area.innerHTML
            text_area.innerHTML = `
            <textarea type=text class = edit-box-text id=edit-box-${e.target.id.split('-')[1]}>${prev_text}</textarea>
            <div class="inside-control">
                <button class = edit-box-button id = edit-box-done-${e.target.id.split('-')[1]}, onclick = "update('${e.target.id.split('-')[1]}')">
                </button>
                <button class = cancel-box-button id = cancel-box-done-${e.target.id.split('-')[1]}, onclick = "cancel('${e.target.id.split('-')[1]}')">
                </button>
            </div>
            `
            control = document.getElementById(`control-${e.target.id.split('-')[1]}`)
            control.style.display = "None"
        })

        control = document.createElement("div")
        control.setAttribute("class", `control ${d[i]._id}`)
        control.setAttribute("id", `control-${d[i]._id}`)
        div.appendChild(node)
        para.appendChild(div)
        control.appendChild(node_del)
        control.appendChild(node_edit)
        para.appendChild(control)
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

cancel = (id) => {
    console.log("pressed cancel");
    a = document.getElementById(`edit-box-${id}`)
    prev = a.value
    console.log(prev);
    console.log(a);
    b = document.getElementById(`data-${id}`)
    b.innerHTML = prev
    control = document.getElementById(`control-${id}`)
    control.style.display = "flex"
}

n = document.getElementById("new")
n.addEventListener("click", () => {
    a = document.getElementById("add-notes")
    glass = document.getElementById("glass")



    if (a.className == "add-notes-hidden") {
        glass.classList.remove("glass-hidden")
        a.classList.remove("add-notes-hidden")
        a.classList.toggle("add-notes-visible")
        glass.classList.toggle("glass-visible")
    } else {
        glass.classList.remove("glass-visible")
        a.classList.remove("add-notes-visible")
        a.classList.toggle("add-notes-hidden")
        glass.classList.toggle("glass-hidden")
    }


})