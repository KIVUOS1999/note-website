const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

create_mobile_link = () => {
    document.getElementById("app_add_download").addEventListener("click", (e) => {
        window.location = '../files/knotes.apk'
        console.log("mobile")
    })
}

create_desktop_link = () => {
    document.getElementById("app_add_download").addEventListener('click', (e) => {
        window.location = '../files/Knotes.exe'
        console.log("desktop")
    })
}

if (getDeviceType() == "mobile") {
    document.getElementById("app_add_msg").innerHTML = "Download the app for mobile"
    create_mobile_link()
} else {
    document.getElementById("app_add_msg").innerHTML = "Download the app for desktop"
    create_desktop_link()
}

document.getElementById("app_add_cancel").addEventListener('click', (e) => {
    document.getElementById("app_add").style.display = "none"
})