const searchInput = document.getElementById("search");

const carsList = document.querySelector(".cars-list");
let cards = Array.from(document.querySelectorAll(".car-card"));

const sortButtons = document.querySelectorAll(".sort-section button");
const pageButtons = document.querySelectorAll(".pagination button");

const carsPerPage = 5;
let currentPage = 1;


searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    cards.forEach(card => {

        const title =
            card.querySelector("h2").textContent.toLowerCase();

        if (title.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

    currentPage = 1;
    updatePagination();
});


sortButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sortType = button.dataset.sort;

        if (sortType === "price") {

            cards.sort((a, b) =>
                a.dataset.price - b.dataset.price
            );

        }

        if (sortType === "year") {

            cards.sort((a, b) =>
                b.dataset.year - a.dataset.year
            );

        }

        cards.forEach(card => {
            carsList.appendChild(card);
        });

        updatePagination();
    });

});


function updatePagination() {

    const visibleCards = cards.filter(card =>
        card.style.display !== "none"
    );

    const totalPages = Math.ceil(
        visibleCards.length / carsPerPage
    );

    visibleCards.forEach((card, index) => {

        const start = (currentPage - 1) * carsPerPage;
        const end = start + carsPerPage;

        if (index >= start && index < end) {
            card.style.visibility = "visible";
            card.style.position = "static";
        } else {
            card.style.visibility = "hidden";
            card.style.position = "absolute";
        }

    });

    pageButtons.forEach(button => {

        const page = button.dataset.page;

        if (!isNaN(page)) {

            if (Number(page) === currentPage) {
                button.style.background = "#1d4ed8";
            } else {
                button.style.background = "#2563eb";
            }

        }

    });

}


pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        const visibleCards = cards.filter(card =>
            card.style.display !== "none"
        );

        const totalPages = Math.ceil(
            visibleCards.length / carsPerPage
        );

        if (page === "prev") {

            if (currentPage > 1) {
                currentPage--;
            }

        } else if (page === "next") {

            if (currentPage < totalPages) {
                currentPage++;
            }

        } else {

            currentPage = Number(page);

        }

        updatePagination();
    });

});


updatePagination();