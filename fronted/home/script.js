const capabilityData = {
  services: [
    {
      title: "分数制高管",
      description: "阶段性 CFO / COO / CMO / HR / CTO 等高阶角色支持。",
      href: "/services"
    },
    {
      title: "AI 与战略顾问",
      description: "判断 AI 转型机会、业务流程改造和战略选择。",
      href: "/services"
    },
    {
      title: "项目型专家团队",
      description: "为增长、组织、转型、新业务等具体项目组建小型专家组。",
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
      title: "增长瓶颈",
      description: "重新判断市场、渠道、销售组织或增长模型。",
      href: "/services"
    },
    {
      title: "AI 转型",
      description: "找到值得优先改造的业务环节，并形成可执行试点。",
      href: "/services"
    },
    {
      title: "组织升级",
      description: "支持组织结构、关键岗位、管理机制和团队能力升级。",
      href: "/services"
    },
    {
      title: "项目攻坚",
      description: "为时间敏感的关键项目补充负责人、PMO 或跨职能专家。",
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

function init() {
  window.ZuoanShared.renderHeader("/");
  window.ZuoanShared.renderFooter();
  window.ZuoanShared.bindSharedInteractions();
  renderCapabilityCards("services");
  bindCapabilityTabs();
}

init();
