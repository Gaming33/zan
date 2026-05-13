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
          <h3>关于左安</h3>
          <p>为企业关键阶段连接高阶独立人才。</p>
          <ul>
            <li><a href="/">为什么选择左安</a></li>
            <li><a href="/">左安如何工作</a></li>
          </ul>
        </section>
        <section>
          <h3>我们做什么</h3>
          <ul>
            <li><a href="/services">按需人才</a></li>
            <li><a href="/services">临时高管</a></li>
            <li><a href="/services">我们做什么</a></li>
          </ul>
        </section>
        <section>
          <h3>资源</h3>
          <ul>
            <li><a href="/resources">商业资源中心</a></li>
            <li><a href="/resources">案例研究</a></li>
          </ul>
        </section>
        <section>
          <h3>加入左安</h3>
          <ul>
            <li><a href="/join">成为独立人才</a></li>
            <li><a href="/join">人才资源</a></li>
          </ul>
        </section>
      </div>
      <div class="container site-footer__contact">
        <div>
          <h3>联系我们</h3>
          <a class="site-footer__mail" href="mailto:contact@zuoanmen.com">contact@zuoanmen.com</a>
          <span class="site-footer__note">邮箱为原型占位，正式上线前确认。</span>
        </div>
        <div class="site-footer__qr" aria-label="公众号二维码占位">
          <span>公众号二维码</span>
        </div>
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
