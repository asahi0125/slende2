window.addEventListener("scroll", function () {
  const cta = document.querySelector(".cta-fixed");
  if (window.scrollY > 300) {
    cta.classList.add("show");
  } else {
    cta.classList.remove("show");
  }
});
