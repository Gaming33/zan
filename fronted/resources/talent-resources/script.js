window.ZuoanShared?.renderHeader?.("/resources/talent-resources");
window.ZuoanShared?.renderFooter?.();
window.ZuoanShared?.bindSharedInteractions?.();

const filterButtons = Array.from(document.querySelectorAll(".topic-filter"));
const cards = Array.from(document.querySelectorAll(".blog-card"));

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
