var username = document.getElementById("username-ex");
var EYU = prompt("Enter your username");
if (EYU === "") {
    if(alert("Please enter your username to start the game!")){

    }
    else    window.location.reload(); 
}
else if (EYU) {
    username.innerText = EYU;
}
else {
    if(alert("Please enter your username to start the game!")){

    }
    else    window.location.reload(); 
}
