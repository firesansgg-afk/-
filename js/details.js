const mainImage =
    document.getElementById("mainCarImage");

const thumbnails =
    document.querySelectorAll(".thumbnails img");

thumbnails.forEach(image => {

    image.addEventListener("click", () => {

        mainImage.src = image.src;

    });

});


const reviewsContainer =
    document.getElementById("reviewsContainer");

const addReviewBtn =
    document.getElementById("addReviewBtn");

const userName =
    document.getElementById("userName");

const userReview =
    document.getElementById("userReview");


loadReviews();


addReviewBtn.addEventListener("click", () => {

    const name =
        userName.value.trim();

    const review =
        userReview.value.trim();

    if (name === "" || review === "") {

        alert("Заполните все поля");

        return;
    }

    const reviewData = {
        name,
        review
    };

    saveReview(reviewData);

    addReviewToPage(reviewData);

    userName.value = "";
    userReview.value = "";
});


function addReviewToPage(reviewData) {

    const div =
        document.createElement("div");

    div.classList.add("review");

    div.innerHTML = `
        <h3>${reviewData.name}</h3>
        <p>${reviewData.review}</p>
    `;

    reviewsContainer.appendChild(div);
}


function saveReview(reviewData) {

    const reviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];

    reviews.push(reviewData);

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );
}


function loadReviews() {

    const reviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];

    reviews.forEach(review => {

        addReviewToPage(review);

    });
}