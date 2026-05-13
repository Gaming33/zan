const navItems = [
  { label: "首页", href: "/" },
  { label: "我们做什么", href: "/services" },
  { label: "资源", href: "/resources" },
  { label: "加入左安", href: "/join" },
  { label: "寻找人才", href: "/find-talent" }
];

function renderHeader(activePath = "/") {
  const mount = document.querySelector("[data-shared-header]");
  if (!mount) return;

  mount.innerHTML = `
    <header class="site-header" data-site-header>
      <div class="container site-header__inner">
        <a class="brand-mark" href="/" aria-label="左安门首页">
          <span class="brand-mark__symbol" aria-hidden="true">左</span>
          <span>左安门</span>
        </a>
        <button class="mobile-menu-button" type="button" aria-label="展开导航" aria-expanded="false" data-menu-toggle>
          <span aria-hidden="true"></span>
        </button>
        <nav class="site-nav" aria-label="主导航">
          ${navItems.map((item) => `
            <a href="${item.href}" ${item.href === activePath ? 'aria-current="page"' : ""}>${item.label}</a>
          `).join("")}
        </nav>
        <div class="header-actions">
          <a class="button button--secondary" href="/join">申请入席</a>
          <a class="button button--primary" href="/find-talent">提交需求</a>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const mount = document.querySelector("[data-shared-footer]");
  if (!mount) return;

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__main">
        <section>
          <h2>左安门</h2>
          <p>为企业关键阶段连接高阶独立人才。</p>
          <p>阶段性高阶能力支持，面向增长、组织、AI 转型和关键项目。</p>
        </section>
        <section>
          <h3>网站导航</h3>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/services">我们做什么</a></li>
            <li><a href="/resources">资源</a></li>
          </ul>
        </section>
        <section>
          <h3>企业入口</h3>
          <ul>
            <li><a href="/find-talent">寻找人才</a></li>
            <li><a href="/find-talent">提交需求</a></li>
            <li><a href="/services">查看服务方式</a></li>
          </ul>
        </section>
        <section>
          <h3>人才与资源</h3>
          <ul>
            <li><a href="/join">加入左安</a></li>
            <li><a href="/join">申请入席</a></li>
            <li><a href="/resources">阅读资源</a></li>
          </ul>
        </section>
      </div>
      <div class="container site-footer__bar">
        <span>© 2026 左安门</span>
        <div class="site-footer__legal" aria-label="法律文本">
          <span>隐私政策</span>
          <span>服务条款</span>
        </div>
      </div>
    </footer>
  `;
}

function bindSharedInteractions() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

window.ZuoanShared = {
  renderHeader,
  renderFooter,
  bindSharedInteractions
};
