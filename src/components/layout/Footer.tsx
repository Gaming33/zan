import { Link } from 'react-router-dom'
import { Container } from './Container'

const footerColumns = [
  {
    title: '认识ZAN',
    links: [
      { label: '关于我们', to: '/about' },
      { label: '为什么选择ZAN', to: '/why-zoan' },
    ],
  },
  {
    title: '我们的服务',
    links: [
      { label: '服务总览', to: '/services' },
      { label: '合作流程', to: '/services/process' },
    ],
  },
  {
    title: '发现机会',
    links: [
      { label: '项目机会', to: '/projects' },
      { label: '洞察', to: '/insights' },
      { label: '课程项目', to: '/programs' },
    ],
  },
  {
    title: '联系我们',
    links: [
      { label: '企业合作', to: '/enterprise/contact' },
      { label: '人才入驻', to: '/talent/apply' },
      { label: 'contact@zuoanmen.com', to: 'mailto:contact@zuoanmen.com' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-primary text-inverse-text">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith('mailto:') ? (
                      <a
                        href={link.to}
                        className="text-sm text-inverse-text/70 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-inverse-text/70 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-inverse-text/20 pt-8 sm:flex-row">
          <p className="text-xs text-inverse-text/50">&copy; 2026 ZAN</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-inverse-text/50 transition-colors hover:text-accent">
              隐私政策
            </Link>
            <Link to="/terms" className="text-xs text-inverse-text/50 transition-colors hover:text-accent">
              服务条款
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
