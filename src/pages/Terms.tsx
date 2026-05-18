import { Link } from 'react-router';

export default function Terms() {
  return (
    <main>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-16" style={{ backgroundColor: '#0d1d35' }}>
        <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 700 }}>
            服务条款
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
              欢迎使用左安（"ZAN"）。在使用本网站及相关服务前，请仔细阅读以下条款。您一旦访问或使用本网站，即视为接受本条款约束。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              一、服务范围
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              左安提供高阶人才与企业之间的对接服务，包括按需人才匹配、临时高管引荐、项目制专家组队等。具体的服务范围、交付方式、商业条款以双方另行签订的协议为准，本网站内容仅作信息展示之用。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              二、用户责任
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>
              使用本网站时，您承诺：
            </p>
            <ul className="space-y-2 mb-6">
              {[
                '所提供的所有信息真实、准确、完整',
                '不进行任何违反法律法规或公序良俗的活动',
                '不利用本网站从事侵犯他人合法权益的行为',
                '不通过技术手段干扰或破坏本网站的正常运行',
              ].map((t, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              三、知识产权
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              本网站上的文字、图片、视频、案例研究、方法论及其他内容均为左安或其内容合作方所有，受著作权法和相关法律保护。未经事先书面许可，您不得复制、转载、修改或用于商业目的。引用本网站内容时，需明确标注来源。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              四、免责声明
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>
              本网站内容仅作参考之用，不构成任何形式的专业意见或商业承诺。在做出任何决策前，请结合您的实际情况独立判断。在法律允许的最大范围内：
            </p>
            <ul className="space-y-2 mb-6">
              {[
                '我们不对网站内容的准确性、完整性、及时性作明示或暗示的保证',
                '我们不对使用本网站可能造成的任何直接或间接损失负责',
                '因不可抗力（如系统故障、网络中断等）导致的服务中断，不视为违约',
              ].map((t, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              五、条款变更
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              我们保留随时修改本服务条款的权利。变更后将在本页面公示，自公示之日起生效。您继续使用本网站即视为接受变更后的条款。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              六、争议解决
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d4a5c' }}>
              本条款的解释与执行适用中华人民共和国法律。因本条款引发的任何争议，双方应首先通过友好协商解决；协商不成的，提交左安所在地有管辖权的人民法院诉讼解决。
            </p>

            <h2 className="font-display text-lg md:text-xl pt-6 mb-4 mt-8" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>
              七、联系我们
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#3d4a5c' }}>
              如对本条款有任何疑问，请通过以下方式联系：
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
