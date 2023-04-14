
function sendData() { //orgenize the data and calls 
    let valuesarr = document.getElementsByName("dataInfo")

    var sendvalues = new Array(19);
    for (let i = 0; i < 19; i++) {
        sendvalues[i] = valuesarr[i].value
    }

    //alert(sendvalues)
    getHeartResult(sendvalues);
}

async function getHeartResult(sendvalues) {
    let response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: JSON.stringify({sendvalues}),
        headers: {'Content-Type': 'application/json'},
    })
    var myJSON_Text = await response.text();
    let Result = myJSON_Text.split(',');
    document.cookie = "IsSick=" + Result;
    window.location.href = 'ResPage.html';

    //check the res container
    return Result;
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}