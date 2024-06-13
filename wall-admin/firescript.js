// Ініціалізуємо Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBC6DE1C4XUXpU0JY0w1SVqweQTGtnFNx0",
    authDomain: "lq-cm-tst.firebaseapp.com",
    databaseURL: "https://lq-cm-tst-default-rtdb.firebaseio.com",
    projectId: "lq-cm-tst",
    storageBucket: "lq-cm-tst.appspot.com",
    messagingSenderId: "395966889397",
    appId: "1:395966889397:web:376f7d4e2faaaf8383edfc"
};
firebase.initializeApp(firebaseConfig);

// Посилання на базу даних
var database = firebase.database().ref("comments");

// Функція для надсилання коментаря
function submitComment() {
    var name = document.getElementById("name").value;
    var commentText = document.getElementById("comment").value;

    if (name && commentText) {
        var newCommentRef = database.push();
        newCommentRef.set({
            name: name,
            comment: commentText
        });

        document.getElementById("comment").value = "";

        // Прокручуємо сторінку до низу
        window.scrollTo(0, 0);
    }
}

// Виведення коментарів
database.on("child_added", function(snapshot) {
    var comment = snapshot.val();
    var commentsDiv = document.getElementById("comments");

    var commentElement = document.createElement("div");
    commentElement.id = snapshot.key;
    commentElement.innerHTML = `
        <strong>${comment.name}</strong><br>${comment.comment}
        <br>
        <div class="admincomcont">
        <input type="checkbox" class="commentCheckbox" id="check-${snapshot.key}">
        <button id="delbutton" onclick="deleteComment('${snapshot.key}')">Видалити</button>
        </div>
    `;
    commentsDiv.appendChild(commentElement);

    // Прокручуємо сторінку до низу при додаванні нового коментаря
    window.scrollTo(0, 0);
});

// Видалення одного коментаря
function deleteComment(commentId) {
    var commentElement = document.getElementById(commentId);

    if (commentElement) {
        commentElement.remove();
        database.child(commentId).remove();
    }
}

// Видалення вибраних коментарів
function deleteSelectedComments() {
    var checkboxes = document.querySelectorAll('.commentCheckbox:checked');
    checkboxes.forEach(function(checkbox) {
        var commentId = checkbox.id.replace('check-', '');
        deleteComment(commentId);
    });
}

// Видалення всіх коментарів
function deleteAllComments() {
    var commentsDiv = document.getElementById("comments");
    commentsDiv.innerHTML = "";
    database.remove();
}

// Видалення коментарів за текстом
function deleteCommentsByText() {
    var textToDelete = document.getElementById("deleteText").value.toLowerCase();
    if (!textToDelete) return;

    database.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var comment = childSnapshot.val().comment.toLowerCase();
            if (comment.includes(textToDelete)) {
                deleteComment(childSnapshot.key);
            }
        });
    });
}
