const caseStudies = [
  {
    title: "优化营养与健康公司的供应链能力",
    industry: "消费与零售",
    function: "运营与供应链",
    summary: "一家营养与健康企业需要外部运营专家，支持关键采购、履约和价值实现。"
  },
  {
    title: "临时 HR 负责人支持组织过渡",
    industry: "金融与投资",
    function: "组织与人才",
    summary: "一家企业在关键管理岗位空缺期间，需要阶段性负责人承接团队管理和运营节奏。"
  },
  {
    title: "制造企业转型中的变革管理",
    industry: "制造与供应链",
    function: "转型与项目管理",
    summary: "一家制造企业在业务调整阶段，需要变革管理和项目推进支持。"
  },
  {
    title: "医疗健康创新机会评估",
    industry: "医疗与健康",
    function: "战略与商业模式",
    summary: "一家医疗健康企业需要外部专家评估新技术方向和服务线机会。"
  },
  {
    title: "多站点扩张中的财务运营支持",
    industry: "医疗与健康",
    function: "财务与融资",
    summary: "一家多站点运营企业在扩张阶段，需要阶段性财务负责人建立基础管理能力。"
  },
  {
    title: "销售策略规划的外部视角",
    industry: "科技与互联网",
    function: "增长与市场",
    summary: "一家企业在调整销售策略前，需要外部视角帮助判断市场、渠道和团队配置。"
  }
];

const industryOptions = [
  "全部行业",
  "消费与零售",
  "科技与互联网",
  "制造与供应链",
  "医疗与健康",
  "金融与投资",
  "专业服务",
  "教育与文化",
  "其他"
];

const functionOptions = [
  "全部职能",
  "增长与市场",
  "战略与商业模式",
  "组织与人才",
  "财务与融资",
  "运营与供应链",
  "数字化与 AI",
  "转型与项目管理"
];

const industryFilter = document.querySelector("#industryFilter");
const functionFilter = document.querySelector("#functionFilter");
const searchInput = document.querySelector("#caseSearch");
const resetButton = document.querySelector("#resetFilters");
const resultCount = document.querySelector("#resultCount");
const caseGrid = document.querySelector("#caseGrid");
const emptyState = document.querySelector("#emptyState");

function populateOptions(select, options) {
  select.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join("");
}

function matchesSearch(item, query) {
  if (!query) return true;
  const haystack = [item.title, item.industry, item.function, item.summary].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function getFilteredCases() {
  const selectedIndustry = industryFilter.value;
  const selectedFunction = functionFilter.value;
  const query = searchInput.value.trim();

  return caseStudies.filter((item) => {
    const industryMatch = selectedIndustry === "全部行业" || item.industry === selectedIndustry;
    const functionMatch = selectedFunction === "全部职能" || item.function === selectedFunction;
    return industryMatch && functionMatch && matchesSearch(item, query);
  });
}

function renderCases() {
  const filteredCases = getFilteredCases();

  resultCount.textContent = `共 ${filteredCases.length} 个结果`;
  emptyState.hidden = filteredCases.length !== 0;
  caseGrid.innerHTML = filteredCases.map((item, index) => `
    <article class="case-card">
      <div class="case-card__media" aria-hidden="true">
        <span class="case-card__meta">${item.industry} / ${item.function}</span>
      </div>
      <div class="case-card__body">
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
        <button class="case-card__read" type="button" data-case-index="${index}" aria-label="阅读案例：${item.title}">查看</button>
      </div>
    </article>
  `).join("");
}

function resetFilters() {
  industryFilter.value = "全部行业";
  functionFilter.value = "全部职能";
  searchInput.value = "";
  renderCases();
}

function initResourcesPage() {
  window.ZuoanShared?.renderHeader("/resources/case-studies");
  window.ZuoanShared?.renderFooter();
  window.ZuoanShared?.bindSharedInteractions();

  populateOptions(industryFilter, industryOptions);
  populateOptions(functionFilter, functionOptions);

  industryFilter.addEventListener("change", renderCases);
  functionFilter.addEventListener("change", renderCases);
  searchInput.addEventListener("input", renderCases);
  resetButton.addEventListener("click", resetFilters);
  caseGrid.addEventListener("click", (event) => {
    const readButton = event.target.closest(".case-card__read");
    if (!readButton) return;
    readButton.textContent = "详情待补充";
  });

  renderCases();
}

initResourcesPage();
