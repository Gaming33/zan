import { Link } from 'react-router';

export default function Privacy() {
  return (
    <main>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-16" style={{ backgroundColor: '#0d1d35' }}>
        <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 700 }}>
            隐私政策
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            最后更新：2026 年 5 月
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="p-8 md:p-10 rich-text-content" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed' }}>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#3d4a5c' }}>
              左安（"ZAN"，下称"我们"）尊重并保护所有使用本网站用户的个人隐私。本政策说明我们如何收集、使用、存储您的个人信息，以及您拥有的权利。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              一、我们收集的信息
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>
              当您通过"招贤纳士"或"人才入席"表单提交需求时，我们会收集您主动提供的信息，包括但不限于：
            </p>
            <ul className="space-y-2 mb-6">
              {[
                '姓名、联系邮箱、联系电话',
                '所在公司名称、职务、所在行业',
                '业务挑战描述、个人简介与从业经历',
                '其他您主动填写的内容',
              ].map((t, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              二、信息的使用方式
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>
              您提供的信息仅用于以下目的：
            </p>
            <ul className="space-y-2 mb-6">
              {[
                '左安顾问基于您的需求进行后续联系与服务对接',
                '为您匹配合适的高阶人才或项目机会',
                '在您同意的前提下，向您分享行业洞察与产品更新',
                '法律法规要求的合规用途',
              ].map((t, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              我们<strong style={{ color: '#1a2332' }}>不会</strong>将您的个人信息出售、租赁或对外公开分享。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              三、信息的存储与保护
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              我们采用行业标准的安全措施存储您的个人信息，包括传输加密（HTTPS）、数据库行级权限控制等。我们仅在实现服务目的所必需的期限内保留您的信息。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              四、您的权利
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>
              您拥有以下权利：
            </p>
            <ul className="space-y-2 mb-6">
              {[
                '查询、访问我们保存的您的个人信息',
                '要求更正不准确或不完整的信息',
                '要求删除您的个人信息',
                '撤销之前给予的任何同意',
              ].map((t, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              五、政策更新
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              我们可能不定期更新本隐私政策。重大变更时，我们会通过网站公告或邮件通知您。继续使用我们的服务即表示您接受更新后的政策。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              六、联系我们
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#3d4a5c' }}>
              如对本隐私政策有任何疑问或希望行使上述权利，请通过以下方式联系我们：
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ color: '#3d4a5c' }}>
              邮箱：<a href="mailto:contact@zuoan.cn" style={{ color: '#10b981' }}>contact@zuoan.cn</a>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm" style={{ color: '#10b981' }}>← 返回首页</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
