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


function restoreTitle() {
    var titleElement = document.getElementById('socialTitle');
    titleElement.innerHTML = '<h3> Соцмережі </h3>';
}

var currentDate = new Date();
var birthDate = new Date("2005-10-27");
var age = currentDate.getFullYear() - birthDate.getFullYear();
var birthDateThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

if (currentDate < birthDateThisYear) {
    age--;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var speed = 20;

let textToType = [{text: 'Олег Любченко', elementId: 'name'},
{text: 'UI/UX-Дизайнер', elementId: 'proffession'},
{text: age + ' років • Україна', elementId: 'country'},
{text: 'Мої вітання! Я роблю дизайн інтерфейсу для мобільних, десктопних та WEB застосунків. Окрім цього я також полюбляю монтувати відео, обробляти фото та малювати векторну графіку.', elementId: 'about'},];

async function type(data){
    for (element of data)
    {
        let index = 0;
        let domElement = document.getElementById(element.elementId);
        let len = element.text.length;
        while (index < len) {
            domElement.textContent += element.text.charAt(index);
            await sleep(speed);
            index++;
        }
    }
}


window.addEventListener('load', function () {
    type(textToType);
});

document.addEventListener('DOMContentLoaded', function() {
    var currentPhotoIndex = 1; // починаємо з першої фотографії
    var totalPhotos = 3; // загальна кількість фотографій
    var container = document.querySelector('.instagram-photos-container');
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    // Функція для зміни класу фотографії та застосування анімації "fade"
    function changePhoto(index) {
        var photos = container.querySelectorAll('.instagram-photos');
        photos.forEach(function(photo) {
            photo.style.opacity = '0'; // змінюємо прозорість на 0
        });
        setTimeout(function() {
            photos.forEach(function(photo) {
                photo.style.display = 'none'; // ховаємо фотографії
            });
            var currentPhoto = container.querySelector('.photo' + index);
            currentPhoto.style.display = 'block'; // показуємо поточну фотографію
            setTimeout(function() {
                currentPhoto.style.opacity = '1'; // змінюємо прозорість на 1 з анімацією "fade"
            }, 50);
        }, 100);
    }

    // Функція для переходу до попередньої фотографії
    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos || totalPhotos;
        changePhoto(currentPhotoIndex);
    }

    // Функція для переходу до наступної фотографії
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex % totalPhotos) + 1;
        changePhoto(currentPhotoIndex);
    }

    // Додавання обробників подій для кнопок "назад" та "вперед"
    prevButton.addEventListener('click', prevPhoto);
    nextButton.addEventListener('click', nextPhoto);

    // Відображення першої фотографії при завантаженні сторінки
    changePhoto(currentPhotoIndex);
});
