function toggleAudio() {
    var audio = document.getElementById("audio");
    var photo = document.querySelector(".item-meme");

    if (audio.paused) {
        audio.play();
        photo.classList.add("playing");
    } else {
        audio.pause();
        photo.classList.remove("playing");
    }
}