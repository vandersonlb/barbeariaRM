
(function () {
  const menuHamburguer = document.querySelector("[data-menu-hamburguer]");
  const menuLinks = document.querySelectorAll(".header__list a");

  menuLinks.forEach(menu => {
    menu.addEventListener('click', (evt) => {
      menuHamburguer.checked = false;
    })
  })
})();
