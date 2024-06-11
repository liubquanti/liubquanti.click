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
            comment: commentText,
            score: 0
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
    commentElement.innerHTML = "<strong>" + comment.name + "</strong> <br>" + comment.comment;

    var likeDislikeContainer = document.createElement("div");
    likeDislikeContainer.className = "like-dislike-container";

    var likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.innerHTML = "🔼";
    likeButton.onclick = function() {
        updateScore(snapshot.key, 1);
    };

    var scoreElement = document.createElement("span");
    scoreElement.className = "score";
    scoreElement.id = "score-" + snapshot.key;
    scoreElement.innerHTML = comment.score !== undefined ? comment.score : 0;
    updateScoreColor(scoreElement, comment.score);

    var dislikeButton = document.createElement("button");
    dislikeButton.className = "dislike-button";
    dislikeButton.innerHTML = "🔽";
    dislikeButton.onclick = function() {
        updateScore(snapshot.key, -1);
    };

    likeDislikeContainer.appendChild(likeButton);
    likeDislikeContainer.appendChild(scoreElement);
    likeDislikeContainer.appendChild(dislikeButton);

    commentElement.appendChild(likeDislikeContainer);
    commentsDiv.appendChild(commentElement);

    // Прокручуємо сторінку до низу при додаванні нового коментаря
    window.scrollTo(0, 0);
});

// Оновлення рахунку
function updateScore(commentId, delta) {
    var commentRef = database.child(commentId);

    commentRef.transaction(function(comment) {
        if (comment) {
            if(!comment.score){
                comment.score = 0;
            }
            comment.score += delta;
        }
        return comment;
    }, function(error, committed, snapshot) {
        if (error) {
            console.log("Transaction failed: ", error);
        } else if (committed) {
            var scoreElement = document.getElementById("score-" + commentId);
            var newScore = snapshot.val().score !== undefined ? snapshot.val().score : 0;
            scoreElement.innerHTML = newScore;
            updateScoreColor(scoreElement, newScore);
        }
    });
}

// Функція для оновлення кольору лічильника
function updateScoreColor(element, score) {
    if (score < 0) {
        element.style.color = "#ff8282";
    } else if (score > 0) {
        element.style.color = "#82ff9d";
    } else {
        element.style.color = "white";
    }
}

// Оновлення рахунку в реальному часі
database.on("child_changed", function(snapshot) {
    var comment = snapshot.val();
    var scoreElement = document.getElementById("score-" + snapshot.key);
    scoreElement.innerHTML = newScore;
    updateScoreColor(scoreElement, newScore);
});

// Видалення коментаря
function deleteComment(commentId) {
    var commentElement = document.getElementById(commentId);

    if (commentElement) {
        commentElement.remove();
        database.child(commentId).remove();
    }
}
