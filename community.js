// Open and Close Modals 
const overlay = document.getElementById("overlay");
const queryModal = document.getElementById("queryModal");
const answersModal = document.getElementById("answersModal");
const feedContainer = document.getElementById("feedContainer");
const closeModalBtn = document.querySelector(".query-close-button");
const closeAnswersBtn = document.querySelector(".answers-close-button");
let activeFeed = null; // To track which feed's comment section is active

// Open the query modal
function openModal() {
    overlay.classList.add("active");
    queryModal.classList.add("active");
}

// Close the query modal
function closeModal() {
    overlay.classList.remove("active");
    queryModal.classList.remove("active");
}

// Open the answers modal and display comments for the selected feed
function openAnswersModal(feedElement) {
    overlay.classList.add("active");
    answersModal.classList.add("active");
    activeFeed = feedElement; // Set the current feed as active for comments
    displayComments(activeFeed);
}

// Close the answers modal
function closeAnswersModal() {
    overlay.classList.remove("active");
    answersModal.classList.remove("active");
    activeFeed = null;
}

// Post a new query and add it to the feed
function submitQuery() {
    const title = document.getElementById("queryTitle").value;
    const description = document.getElementById("queryDescription").value;

    if (title && description) {
        // Create a new feed post element
        const newFeed = document.createElement("div");
        newFeed.classList.add("feed");
        newFeed.innerHTML = `
            <div class="user">
                <div class="profile-pic">
                    <img src="profile-pic.jpg" alt="User Picture">
                </div>
                <div class="text">
                    <strong class="username">You</strong><br>
                    <small>Just now</small>
                </div>
            </div>
            <div class="post">
                <strong class="post-title">${title}</strong>
                <p>${description}</p>
            </div>
            <div class="feed-footer">
                <small onclick="openAnswersModal(this.parentElement.parentElement)">View Comments</small>
                <small>Like</small>
            </div>
            <div class="comments"></div> <!-- Comments container -->
        `;

        // Add the new feed post to the feed container
        feedContainer.prepend(newFeed);

        // Clear input fields and close the query modal
        document.getElementById("queryTitle").value = "";
        document.getElementById("queryDescription").value = "";
        closeModal();
    } else {
        alert("Please fill out both fields.");
    }
}

// Display comments in the answers modal
function displayComments(feedElement) {
    const commentsContainer = feedElement.querySelector(".comments");
    const modalBody = document.querySelector(".answers-modal .modal-body");
    modalBody.innerHTML = commentsContainer.innerHTML;
}

// Post a comment to the active feed
function postComment() {
    const comment = document.getElementById("newComment").value;
    if (comment && activeFeed) {
        const commentsContainer = activeFeed.querySelector(".comments");

        // Create a new comment element
        const newComment = document.createElement("p");
        newComment.innerHTML = `<strong class="user-comment">You:</strong> ${comment}`;
        commentsContainer.appendChild(newComment);

        // Update the modal view with the new comment
        displayComments(activeFeed);

        // Clear the comment input field
        document.getElementById("newComment").value = "";
    } else {
        alert("Please enter a comment.");
    }
}

// Close both modals when clicking outside them
overlay.addEventListener("click", () => {
    closeModal();
    closeAnswersModal();
});

// Event listeners for the close buttons
closeModalBtn.addEventListener("click", closeModal);
closeAnswersBtn.addEventListener("click", closeAnswersModal);
