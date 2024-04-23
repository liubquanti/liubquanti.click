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

window.addEventListener('load', function () {
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

var nameIndex = 0;
var proffessionIndex = 0;
var countryIndex = 0;
var aboutIndex = 0;

var name = 'Олег Любченко';
var proffession = 'UI/UX-Дизайнер';
var country = 'Україна';
var about = 'Мої вітання! Я - починаючий UI/UX-дизайнер.';
var speed = 50; // затримка у 1 секунду

function typeName() {
    if (nameIndex < name.length) {
        document.getElementById("name").innerHTML += name.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeName, speed);
    } else {
        setTimeout(typeProffession, speed); // якщо рядок name вже написаний, починаємо писати proffession
    }
}

function typeProffession() {
    if (proffessionIndex < proffession.length) {
        document.getElementById("proffession").innerHTML += proffession.charAt(proffessionIndex);
        proffessionIndex++;
        setTimeout(typeProffession, speed);
    } else {
        setTimeout(typeCountry, speed); // якщо рядок proffession вже написаний, починаємо писати country
    }
}

function typeCountry() {
    if (countryIndex < country.length) {
        document.getElementById("country").innerHTML += country.charAt(countryIndex);
        countryIndex++;
        setTimeout(typeCountry, speed);
    } else {
        setTimeout(typeAbout, speed); // якщо рядок country вже написаний, починаємо писати about
    }
}

function typeAbout() {
    if (aboutIndex < about.length) {
        document.getElementById("about").innerHTML += about.charAt(aboutIndex);
        aboutIndex++;
        setTimeout(typeAbout, speed);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(typeName, speed);
});
