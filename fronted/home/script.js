const capabilityData = {
  services: [
    {
      title: "按需人才",
      description: "为阶段性任务配置外部高阶能力，不必先创建长期岗位。",
      href: "/services"
    },
    {
      title: "临时高管",
      description: "CFO、COO、CMO、HR、CTO 等关键角色的阶段性支持。",
      href: "/services"
    },
    {
      title: "项目型专家团队",
      description: "围绕增长、组织、转型、新业务等任务组建小型专家组。",
      href: "/services"
    },
    {
      title: "专家诊断与访谈",
      description: "在决策前快速获得行业、职能或管理经验判断。",
      href: "/services"
    }
  ],
  scenes: [
    {
      title: "增长停滞",
      description: "需要重新判断市场、渠道、销售组织或增长模型。",
      href: "/services"
    },
    {
      title: "AI 转型",
      description: "判断哪些业务环节值得先改，而不是先买工具。",
      href: "/services"
    },
    {
      title: "组织升级",
      description: "进入新阶段后，补齐管理机制和关键岗位能力。",
      href: "/services"
    },
    {
      title: "项目攻坚",
      description: "关键项目缺少负责人、PMO 或跨职能专家。",
      href: "/services"
    }
  ],
  roles: [
    {
      title: "临时高管",
      description: "在过渡期、增长期或变革期进入企业承担阶段性管理职责。",
      href: "/services"
    },
    {
      title: "独立顾问",
      description: "围绕战略、增长、组织、运营等问题提供专业判断和方案。",
      href: "/services"
    },
    {
      title: "项目负责人",
      description: "把目标拆成任务、里程碑和责任人，推动项目落地。",
      href: "/services"
    },
    {
      title: "行业专家",
      description: "提供行业判断、经验校准和关键决策前的信息输入。",
      href: "/services"
    }
  ]
};

function renderCapabilityCards(key) {
  const grid = document.querySelector("[data-capability-grid]");
  if (!grid) return;

  grid.innerHTML = capabilityData[key].map((item) => `
    <a class="capability-card" href="${item.href}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <span>了解更多</span>
    </a>
  `).join("");
}

function bindCapabilityTabs() {
  const matrix = document.querySelector("[data-capability-matrix]");
  if (!matrix) return;

  const tabs = [...matrix.querySelectorAll("[data-tab]")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderCapabilityCards(tab.dataset.tab);
    });
  });
}

function bindFinalForm() {
  const form = document.querySelector("[data-final-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contact = form.contact.value.trim();
    const problem = form.problem.value.trim();

    if (!contact || !problem) {
      const firstEmpty = !contact ? form.contact : form.problem;
      firstEmpty.focus();
      firstEmpty.style.borderColor = "#fa4d56";
      setTimeout(() => { firstEmpty.style.borderColor = ""; }, 2000);
      return;
    }

    const success = document.createElement("p");
    success.className = "final-cta__success is-visible";
    success.textContent = "已收到你的需求，我们会尽快与你联系。";
    form.replaceWith(success);
  });
}

function init() {
  window.ZuoanShared.renderHeader("/");
  window.ZuoanShared.renderFooter();
  window.ZuoanShared.bindSharedInteractions();
  renderCapabilityCards("services");
  bindCapabilityTabs();
  bindFinalForm();
}

init();
