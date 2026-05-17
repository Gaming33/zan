import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from './Container'

const navItems = [
  {
    label: '认识ZAN',
    children: [
      { label: '关于我们', to: '/about' },
      { label: '为什么选择ZAN', to: '/why-zoan' },
    ],
  },
  {
    label: '服务',
    children: [
      { label: '服务总览', to: '/services' },
      { label: '合作流程', to: '/services/process' },
    ],
  },
  { label: '项目机会', to: '/projects' },
  { label: '洞察', to: '/insights' },
  { label: '课程项目', to: '/programs' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="text-inverse-text text-xl font-bold tracking-tight">
          ZAN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) =>
            'children' in item && item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="text-inverse-text cursor-default text-sm font-medium">
                  {item.label} ▾
                </span>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full rounded-md border border-border bg-surface py-2 shadow-lg">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors hover:text-accent ${
                            isActive ? 'text-accent' : 'text-text-primary'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to!}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-accent ${
                    isActive ? 'text-accent' : 'text-inverse-text'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/enterprise/contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-inverse-text transition-colors hover:bg-accent-hover"
          >
            企业合作
          </Link>
          <Link
            to="/talent/apply"
            className="rounded-md border border-inverse-text px-4 py-2 text-sm font-medium text-inverse-text transition-colors hover:bg-inverse-text/10"
          >
            人才入驻
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-inverse-text lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-inverse-text/20 bg-primary lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) =>
                'children' in item && item.children ? (
                  <div key={item.label}>
                    <span className="text-inverse-text/60 text-xs font-medium uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 block py-1 pl-3 text-sm text-inverse-text transition-colors hover:text-accent"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to!}
                    onClick={() => setMobileOpen(false)}
                    className="py-1 text-sm text-inverse-text transition-colors hover:text-accent"
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/enterprise/contact"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-inverse-text"
                >
                  企业合作
                </Link>
                <Link
                  to="/talent/apply"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md border border-inverse-text px-4 py-2 text-center text-sm font-medium text-inverse-text"
                >
                  人才入驻
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
