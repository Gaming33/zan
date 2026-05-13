const navItems = [
  { label: "首页", href: "/" },
  { label: "我们做什么", href: "/services" },
  { label: "资源", href: "/resources" },
  { label: "加入左安", href: "/join" },
  { label: "寻找人才", href: "/find-talent" }
];

const footerColumns = [
  {
    title: "关于左安",
    links: [
      { label: "为什么选择左安", href: "/#why-zuoan" },
      { label: "左安如何工作", href: "/#how-it-works" }
    ]
  },
  {
    title: "我们做什么",
    links: [
      { label: "按需人才", href: "/services" },
      { label: "临时高管", href: "/services" }
    ]
  },
  {
    title: "资源",
    links: [
      { label: "商业资源中心", href: "/resources" },
      { label: "案例研究", href: "/resources" }
    ]
  },
  {
    title: "加入左安",
    links: [
      { label: "成为独立人才", href: "/join" },
      { label: "人才资源", href: "/join" }
    ]
  }
];

const footerContact = {
  title: "联系我们",
  email: "contact@zuoanmen.com",
  note: "邮箱为原型占位，正式上线前确认。",
  followTitle: "关注我们",
  qrLabel: "公众号二维码"
};

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
        ${footerColumns.map((column) => `
          <section class="site-footer__column" aria-label="${column.title}">
            <h3>${column.title}</h3>
            <ul>
              ${column.links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
            </ul>
          </section>
        `).join("")}
        <section class="site-footer__column site-footer__column--contact" aria-label="${footerContact.title}">
          <div class="site-footer__contact-layout">
            <div class="site-footer__contact-info">
              <h3>${footerContact.title}</h3>
              <a class="site-footer__mail" href="mailto:${footerContact.email}">${footerContact.email}</a>
              <span class="site-footer__note">${footerContact.note}</span>
            </div>
            <div class="site-footer__follow">
              <span class="site-footer__follow-title">${footerContact.followTitle}</span>
              <div class="site-footer__qr" aria-label="${footerContact.qrLabel}占位">
                <span>${footerContact.qrLabel}</span>
              </div>
            </div>
          </div>
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
