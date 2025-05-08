window.addEventListener('load', function () {
    // Calculate age
    var currentDate = new Date();
    var birthDate = new Date("2005-10-27");
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var birthDateThisYear = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (currentDate < birthDateThisYear) {
        age--;
    }
    
    // Update age in country element
    const countryElement = document.getElementById('country');
    if (countryElement) {
        countryElement.textContent = age + ' років • Франція';
    }
    
    // Fetch Instagram followers
    fetchInstagramFollowers();
});

function restoreTitle() {
    var titleElement = document.getElementById('socialTitle');
    titleElement.innerHTML = '<h3> Соцмережі </h3>';
}

// Function to fetch Instagram followers count from Firestore
async function fetchInstagramFollowers() {
    try {
        const response = await fetch('https://firestore.googleapis.com/v1/projects/liubquanti/databases/(default)/documents/media/instagram');
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        
        const data = await response.json();
        
        // Check if the response contains followers count
        if (data && data.fields && data.fields.followers && data.fields.followers.integerValue) {
            const followersCount = parseInt(data.fields.followers.integerValue);
            
            // Update the HTML element with the followers count
            const followersElement = document.getElementById('instagram-followers');
            if (followersElement) {
                followersElement.textContent = followersCount.toLocaleString();
            } else {
                console.warn('Element with ID "instagram-followers" not found');
            }
            
            return followersCount;
        } else {
            console.error('Followers count not found in the response', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Instagram followers:', error);
        return null;
    }
}

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
