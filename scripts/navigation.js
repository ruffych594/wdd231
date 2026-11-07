const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});
