const form = document.getElementById("uploadForm");
const loader = document.getElementById("loader-overlay");

form.addEventListener("submit", function () {
    loader.style.display = "flex";
});