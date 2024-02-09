const wdow = window.location.origin;

const links = document.querySelectorAll(".short-url");

links.forEach((item) => {
  item.textContent = wdow + '/' + item.textContent;
});