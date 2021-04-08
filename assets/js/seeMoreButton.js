
(function () {
  const photoContainer = document.querySelector("[data-photo-grid]");
  const seeMoreButton = document.querySelector("[data-see-more]");

  seeMoreButton.addEventListener("click", () => {
    photoContainer.style.height = "auto";
    photoContainer.style.paddingBottom = "0";

    setTimeout(() => setHref(seeMoreButton), 500);
  });

  function setHref() {
    seeMoreButton.setAttribute("href", "https://www.instagram.com/barbearia_r_m/");
  }
})();
