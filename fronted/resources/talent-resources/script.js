const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const filterButtons = Array.from(document.querySelectorAll(".topic-filter"));
const cards = Array.from(document.querySelectorAll(".blog-card"));

window.ZuoanShared?.renderFooter?.();

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    cards.forEach((card) => {
      const shouldShow = topic === "all" || card.dataset.topic === topic;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
