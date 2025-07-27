document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    const el = document.getElementById("hozumiText");
    if (el) {
      el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/g, " ");
    }
  }
});
