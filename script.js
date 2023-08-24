function toggleAudio() {
    var audio = document.getElementById("audio");
    var photo = document.querySelector(".item-meme");
    var body = document.querySelector("body");

    if (audio.paused) {
        audio.play();
        photo.classList.add("playing");
        body.classList.add("pulse");
    } else {
        audio.pause();
        photo.classList.remove("playing");
        body.classList.remove("pulse");
    }
}

function resetPhoto() {
    var photo = document.querySelector(".item-meme");
    photo.classList.remove("playing");
    photo.style.transform = "rotate(0deg)";

    var body = document.querySelector("body");
    body.classList.remove("pulse");
}

// script.js
window.addEventListener('load', function() {
    var currentDate = new Date();
    var birthDate = new Date("2005-10-27");
    var timeDiff = currentDate - birthDate;
    var age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").textContent = age;
});
