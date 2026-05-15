window.ZuoanShared?.renderHeader?.("/find-talent");
window.ZuoanShared?.renderFooter?.();
window.ZuoanShared?.bindSharedInteractions?.();

const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const form = document.querySelector("#inquiry-form");
const status = document.querySelector("[data-form-status]");
const submitButton = form?.querySelector(".submit-button");
const requiredFields = ["name", "company", "industry", "contact", "problem"];

function clearFieldState(field) {
  field.classList.remove("is-invalid");
  const error = document.querySelector(`[data-error-for="${field.querySelector("input, textarea, select")?.name}"]`);
  if (error) error.textContent = "";
}

function setFieldError(field, message) {
  if (!field) return;
  field.classList.add("is-invalid");
  const control = field.querySelector("input, textarea, select");
  const error = document.querySelector(`[data-error-for="${control?.name}"]`);
  if (error) error.textContent = message;
}

function showStatus(message) {
  if (!status) return;
  status.textContent = message;
  status.hidden = false;
}

function validateForm() {
  let valid = true;
  const formData = new FormData(form);

  form.querySelectorAll(".field").forEach(clearFieldState);

  requiredFields.forEach((name) => {
    const control = form.elements.namedItem(name);
    const field = control?.closest(".field");
    const value = String(formData.get(name) || "").trim();

    if (!value) {
      valid = false;
      setFieldError(field, "请填写此项。");
    }
  });

  return valid;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form || !submitButton) return;

  status.hidden = true;
  status.textContent = "";

  if (!validateForm()) {
    showStatus("请先补全必填项，再提交企业需求。");
    return;
  }

  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "已提交";
  showStatus("已收到你的企业需求。左安门会根据问题背景判断后续沟通和匹配方式。");

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }, 1800);
});

form?.querySelectorAll("input, textarea, select").forEach((control) => {
  control.addEventListener("input", () => {
    const field = control.closest(".field");
    if (!field) return;
    if (field.classList.contains("is-invalid") && String(control.value || "").trim()) {
      clearFieldState(field);
    }
  });
});
