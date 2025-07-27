document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const cta = document.getElementById("stickyCta");
    if (cta) {
      cta.classList.add("show");
    }
  }, 10000);

  const closeBtn = document.getElementById("closeCta");
  closeBtn?.addEventListener("click", () => {
    document.getElementById("stickyCta")?.classList.remove("show");
  });
});
