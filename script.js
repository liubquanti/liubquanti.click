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

window.addEventListener('load', function() {
    var currentDate = new Date();
    
    var birthDate = new Date("2005-10-27");
    
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    var birthDateThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (currentDate < birthDateThisYear) {
        age--;
    }

    document.getElementById("age").textContent = age;
});

function changeTitle(newTitle) {
    document.getElementById('socialTitle').innerHTML = '<h3>' + newTitle + '</h3>';
}

function restoreTitle() {
    var titleElement = document.getElementById('socialTitle');
    titleElement.innerHTML = '<h3> Соцмережі </h3>';
  }