window.ZuoanShared?.renderHeader?.("/join");
window.ZuoanShared?.renderFooter?.();
window.ZuoanShared?.bindSharedInteractions?.();

const form = document.querySelector("#apply-form-el");
const status = document.querySelector("[data-form-status]");
const submitButton = form?.querySelector(".submit-button");
const requiredFields = ["name", "contact", "title", "industry", "description"];

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
    showStatus("请先补全必填项，再提交申请。");
    return;
  }

  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "已提交";
  showStatus("已收到你的申请。左安门会根据你的经验方向，在合适的项目机会出现时联系你。");

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
