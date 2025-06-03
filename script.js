window.addEventListener('load', function () {
    displayAgeAndCountry();
    fetchInstagramFollowers();
});

document.addEventListener('DOMContentLoaded', function() {
    setupInstagramPhotoCarousel();
});

function displayAgeAndCountry() {
    var currentDate = new Date();
    var birthDate = new Date("2005-10-27");
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var birthDateThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (currentDate < birthDateThisYear) {
        age--;
    }

    const countryElement = document.getElementById('country');
    if (countryElement) {
        countryElement.textContent = age + ' років • Франція';
    }
}

function restoreTitle() {
    var titleElement = document.getElementById('socialTitle');
    titleElement.innerHTML = '<h3> Соцмережі </h3>';
}

async function fetchInstagramFollowers() {
    try {
        const response = await fetch('https://firestore.googleapis.com/v1/projects/liubquanti/databases/(default)/documents/media/instagram');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        const data = await response.json();
        updateInstagramFollowersUI(data);
    } catch (error) {
        console.error('Error fetching Instagram followers:', error);
    }
}

function updateInstagramFollowersUI(data) {
    if (data && data.fields && data.fields.followers && data.fields.followers.integerValue) {
        const followersCount = parseInt(data.fields.followers.integerValue);
        const followersElement = document.getElementById('instagram-followers');
        if (followersElement) {
            followersElement.textContent = followersCount.toLocaleString();
        } else {
            console.warn('Element with ID "instagram-followers" not found');
        }
    } else {
        console.error('Followers count not found in the response', data);
    }
}

function setupInstagramPhotoCarousel() {
    var currentPhotoIndex = 1;
    var totalPhotos = 3;
    var container = document.querySelector('.instagram-photos-container');
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    function changePhoto(index) {
        var photos = container.querySelectorAll('.instagram-photos');
        photos.forEach(function(photo) {
            photo.style.opacity = '0';
        });
        setTimeout(function() {
            photos.forEach(function(photo) {
                photo.style.display = 'none';
            });
            var currentPhoto = container.querySelector('.photo' + index);
            currentPhoto.style.display = 'block';
            setTimeout(function() {
                currentPhoto.style.opacity = '1';
            }, 50);
        }, 100);
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos || totalPhotos;
        changePhoto(currentPhotoIndex);
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex % totalPhotos) + 1;
        changePhoto(currentPhotoIndex);
    }

    prevButton.addEventListener('click', prevPhoto);
    nextButton.addEventListener('click', nextPhoto);

    changePhoto(currentPhotoIndex);
}
