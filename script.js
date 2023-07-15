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