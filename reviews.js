console.log("Wendy's Bakery Javascript is working!")

let bakeryName = "Wendy's Bakery ";
console.log(bakeryName);

let pageTitle =
document.getElementById("page-title");
console.log(pageTitle);

pageTitle.textContent = "Customer Reviews";

let reviewForm =
document.getElementById("review-form");

let reviewMessage =
document.getElementById("review-message")

let starRating =
document.getElementById("star-rating");

let stars =
starRating.querySelectorAll("button");

let rating = 0;

stars.forEach(function(star) {
    star.addEventListener("click", function() {
        rating = Number(star.dataset.rating);

        stars.forEach(function(s) {
            if (Number(s.dataset.rating) <= rating) {
                s.style.color = "gold";
            } else {
                s.style.color = "";
            }
        });

        console.log(rating);
    });
});


let reviewText =
document.getElementById("review-text");

let characterCount =
document.querySelector(".character-count");

reviewText.addEventListener("input", function() {

    let count =
    reviewText.value.length;

    characterCount.textContent =
    count + " / 300 characters";
    
    characterCount.classList.remove("warning");
    characterCount.classList.remove("limit");
    
    rating = 0;

  if (count >= 250) {
    characterCount.classList.add("warning");
} else {
    characterCount.classList.remove("warning");
}

if (count >= 300) {
    characterCount.classList.add("limit");
} else {
    characterCount.classList.remove("limit");
}

});


reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let reviewName =
    document.getElementById("review-name");

    let name =
    reviewName.value;

    let text =
    reviewText.value;

    if (rating === 0) {
        alert("Please choose a star rating.");
        return;
    }

    console.log(name);
    console.log(text);
    console.log(rating);

    let newReview =
    document.createElement("div");

    newReview.className = "review-card";

    newReview.innerHTML =
    "<h3>" + name + "</h3>";

    newReview.innerHTML +=
    "<p class='review-label'>Customer Reviews</p>";

    newReview.innerHTML +=
    "<p class='rating'>" + "★".repeat(rating) + "</p>";

    newReview.innerHTML +=
    "<p>" + text + "</p>";

    let date =
    new Date().toLocaleString();

    newReview.innerHTML +=
    "<p class='review-date'>" + date + "</p>";

    let reviewSection =
    document.querySelector("section");

    reviewSection.appendChild(newReview);
    
    reviewMessage.textContent =
    "Your new review has been submitted";
    
    setTimeout(function() {
        reviewMessage.classList.add("hide");
        setTimeout(function () {
            reviewMessage.textContent = "";
            reviewMessage.classList.remove("hide");
        }, 300);
    }, 3000);

    reviewForm.reset();

    characterCount.textContent =
    "0 / 300 characters";

    rating = 0;

    stars.forEach(function(star) {
        star.style.color = "";
    });
});