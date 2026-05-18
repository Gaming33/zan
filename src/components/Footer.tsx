import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0a1628' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        {/* 5列网格 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* 关于 */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest mb-5" style={{ color: '#10b981' }}>关于</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>关于左安</Link></li>
              <li><span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>核心团队</span></li>
              <li><span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>合作伙伴</span></li>
              <li><span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>顾问网络</span></li>
            </ul>
          </div>
          {/* 服务 */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest mb-5" style={{ color: '#10b981' }}>服务</h4>
            <ul className="space-y-2.5">
              <li><Link to="/services" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>按需人才</Link></li>
              <li><Link to="/services" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>临时高管</Link></li>
              <li><Link to="/services" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>项目制专家</Link></li>
            </ul>
          </div>
          {/* 资源 */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest mb-5" style={{ color: '#10b981' }}>资源</h4>
            <ul className="space-y-2.5">
              <li><Link to="/resources" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>行业案例</Link></li>
              <li><Link to="/resources" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>资源智库</Link></li>
            </ul>
          </div>
          {/* 联系 */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest mb-5" style={{ color: '#10b981' }}>联系</h4>
            <ul className="space-y-2.5 mb-4">
              <li><Link to="/find-talent" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>招贤纳士</Link></li>
              <li><Link to="/join" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>人才入席</Link></li>
            </ul>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>商务合作</p>
            <a
              href="mailto:contact@zuoan.cn"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              contact@zuoan.cn
            </a>
          </div>
          {/* 关注我们 */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest mb-5" style={{ color: '#10b981' }}>关注我们</h4>
            <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>关注公众号获取洞察</p>
            <div className="w-20 h-20 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>二维码<br/>占位</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            &copy; 2025 左安 ZAN. 保留所有权利。
          </span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs cursor-pointer transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>隐私政策</Link>
            <Link to="/terms" className="text-xs cursor-pointer transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>服务条款</Link>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>信息安全</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
