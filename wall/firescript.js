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
function submitComment(parentId = null) {
    var name = document.getElementById("name").value;
    var commentText = parentId ? document.getElementById("reply-comment-" + parentId).value : document.getElementById("comment").value;

    if (name && commentText) {
        var newCommentRef = database.push();
        newCommentRef.set({
            name: name,
            comment: commentText,
            score: 0,
            parentId: parentId
        });

        if (parentId) {
            document.getElementById("reply-comment-" + parentId).value = "";
        } else {
            document.getElementById("comment").value = "";
        }

        // Прокручуємо сторінку до низу
        
    }
}

// Виведення коментарів
database.on("child_added", function(snapshot) {
    var comment = snapshot.val();
    var commentsDiv = document.getElementById("comments");

    var commentElement = document.createElement("div");
    commentElement.id = snapshot.key;
    commentElement.className = "comment";

    var commentContent = document.createElement("div");
    commentContent.className = "comment-content";
    commentContent.innerHTML = "<strong>" + comment.name + "</strong> <hr>" + comment.comment;

    var replyContainer = document.createElement("div");
    replyContainer.className = "reply-container";

    var likeDislikeContainer = document.createElement("div");
    likeDislikeContainer.className = "like-dislike-container";

    var likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.innerHTML = "🔼";
    likeButton.onclick = function() {
        updateScore(snapshot.key, 1);
    };

    var score = comment.score !== undefined ? comment.score : 0;
    var scoreElement = document.createElement("span");
    scoreElement.className = "score";
    scoreElement.id = "score-" + snapshot.key;
    scoreElement.innerHTML = formatScore(score);
    updateScoreColor(scoreElement, score);
    updateScoreColor(scoreElement, comment.score);

    var dislikeButton = document.createElement("button");
    dislikeButton.className = "dislike-button";
    dislikeButton.innerHTML = "🔽";
    dislikeButton.onclick = function() {
        updateScore(snapshot.key, -1);
    };

    function formatScore(score) {
        var absScore = Math.abs(score);
        var formattedScore;
    
        if (absScore >= 1000000000) {
            formattedScore = (Math.floor(absScore / 100000000) / 10).toFixed(1) + "B";
        } else if (absScore >= 1000000) {
            formattedScore = (Math.floor(absScore / 100000) / 10).toFixed(1) + "M";
        } else if (absScore >= 1000) {
            formattedScore = (Math.floor(absScore / 100) / 10).toFixed(1) + "K";
        } else {
            formattedScore = absScore.toString();
        }
    
        return score < 0 ? "-" + formattedScore : formattedScore;
    }

    likeDislikeContainer.appendChild(likeButton);
    likeDislikeContainer.appendChild(scoreElement);
    likeDislikeContainer.appendChild(dislikeButton);

    var replyTextarea = document.createElement("textarea");
    replyTextarea.className = "reply-textarea";
    replyTextarea.placeholder = "Відповісти";
    replyTextarea.id = "reply-comment-" + snapshot.key;

    var replySubmitButton = document.createElement("button");
    replySubmitButton.className = "reply-button";
    replySubmitButton.innerHTML = ">";
    replySubmitButton.onclick = function() {
        submitComment(snapshot.key);
    };

    replyContainer.appendChild(likeDislikeContainer);
    replyContainer.appendChild(replyTextarea);
    replyContainer.appendChild(replySubmitButton);

    commentContent.appendChild(replyContainer);

    commentElement.appendChild(commentContent);

    if (comment.parentId) {
        var parentElement = document.getElementById(comment.parentId);
        var parentReplySection = parentElement.querySelector(".reply-section");
        if (!parentReplySection) {
            parentReplySection = document.createElement("div");
            parentReplySection.className = "reply-section";
            parentElement.appendChild(parentReplySection);
        }
        parentReplySection.appendChild(commentElement);
    } else {
        commentsDiv.appendChild(commentElement);
    }
});

// Оновлення рахунку
function updateScore(commentId, delta) {
    var commentRef = database.child(commentId);

    commentRef.transaction(function(comment) {
        if (comment) {
            if (!comment.score) {
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
            scoreElement.innerHTML = formatScore(newScore);
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
    var newScore = snapshot.val().score !== undefined ? snapshot.val().score : 0;
    scoreElement.innerHTML = formatScore(newScore);
    updateScoreColor(scoreElement, newScore);
});

function formatScore(score) {
    var absScore = Math.abs(score);
    var formattedScore;

    if (absScore >= 1000000000) {
        formattedScore = (Math.floor(absScore / 100000000) / 10).toFixed(1) + "B";
    } else if (absScore >= 1000000) {
        formattedScore = (Math.floor(absScore / 100000) / 10).toFixed(1) + "M";
    } else if (absScore >= 1000) {
        formattedScore = (Math.floor(absScore / 100) / 10).toFixed(1) + "K";
    } else {
        formattedScore = absScore.toString();
    }

    return score < 0 ? "-" + formattedScore : formattedScore;
}