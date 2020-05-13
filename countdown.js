function startCountdown(duration) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        if (--timer < 0) {
            var overlay = document.getElementById("overlay");
            overlay.classList.remove("opened");
        }
    }, 1000);
}
window.onload = function() {
    var time = 2;
    startCountdown(time);
};