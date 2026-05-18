import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Globe, CurrencyDollar, Gear, ShoppingCart, Heart, Buildings, Lightning, FilmStrip } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSection({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

const services = [
  {
    title: '按需人才',
    subtitle: 'On-Demand Talent',
    desc: '针对企业在增长、转型、组织升级等关键阶段遇到的具体问题，精准匹配具备对应行业经验与实战能力的顾问人才。不同于传统招聘，按需模式按项目周期灵活配置，快速到岗，以结果为导向。',
    points: ['按项目周期灵活配置', '深度行业与职能匹配', '平均48小时内推荐人选', '按阶段验收、按效付费'],
    image: '/images/service-ondemand.jpg',
  },
  {
    title: '临时高管',
    subtitle: 'Interim Executive',
    desc: '在CEO、CTO、CPO等关键管理岗位出现空缺，或企业处于变革期需要强推动力时，引入经验丰富的临时高管。他们既是业务稳定的压舱石，也是战略落地的推动者，确保过渡期价值不减损。',
    points: ['高管岗位临时补位', '变革管理与组织推动', '保障业务平稳过渡', '完成战略目标交付'],
    image: '/images/service-interim.jpg',
  },
  {
    title: '项目制专家',
    subtitle: 'Project-Based Expert',
    desc: '围绕AI转型落地、产品体系重构、增长模型搭建等复杂战略项目，组建具备互补能力的跨职能专家团队。从诊断到策略再到执行，全程陪伴，确保项目高质量交付并沉淀可复用的方法论。',
    points: ['跨职能专家组队', '全流程项目陪伴', '方法论沉淀输出', '知识转移与能力建设'],
    image: '/images/service-project.jpg',
  },
];

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-20" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.5, filter: 'saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,29,53,0.7), rgba(13,29,53,0.95))' }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4" style={{ fontWeight: 700 }}>
            核心能力
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            从需求诊断到人才匹配，从项目启动到交付验收，为企业提供全链路的高阶能力对接服务
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#5a6779' }}>
              左安不是猎头公司，也不是传统咨询公司。我们专注于企业在<strong style={{ color: '#1a2332' }}>增长突破、AI转型、组织升级、经营提效</strong>等关键阶段的真实能力缺口，通过三种服务模式，让高阶能力精准触达最需要它的地方。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-xs tracking-[0.2em] font-medium mb-8 block text-center" style={{ color: '#10b981' }}>INDUSTRIES WE SERVE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: <Globe size={28} weight="duotone" color="#10b981" />, label: '互联网科技' },
                { icon: <CurrencyDollar size={28} weight="duotone" color="#10b981" />, label: '金融科技' },
                { icon: <Gear size={28} weight="duotone" color="#10b981" />, label: '智能制造' },
                { icon: <ShoppingCart size={28} weight="duotone" color="#10b981" />, label: '消费零售' },
                { icon: <Heart size={28} weight="duotone" color="#10b981" />, label: '医疗健康' },
                { icon: <Buildings size={28} weight="duotone" color="#10b981" />, label: '企业服务' },
                { icon: <Lightning size={28} weight="duotone" color="#10b981" />, label: '新能源' },
                { icon: <FilmStrip size={28} weight="duotone" color="#10b981" />, label: '文化传媒' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3 p-5 rounded transition-all duration-300 hover:shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(16,185,129,0.1)' }}>
                  {item.icon}
                  <span className="text-sm font-medium" style={{ color: '#1a2332' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Details */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-20">
            {services.map((svc, i) => (
              <AnimatedSection key={i}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
                  <div style={{ direction: 'ltr' }}>
                    <div className="rounded overflow-hidden shadow-sm group">
                      <img
                        src={svc.image}
                        alt=""
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ opacity: 0.9, filter: 'saturate(0.85)' }}
                      />
                    </div>
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <span className="text-xs tracking-widest mb-2 block" style={{ color: '#10b981' }}>{svc.subtitle}</span>
                    <h2 className="font-display text-xl md:text-2xl mb-4" style={{ color: '#10b981', fontWeight: 600 }}>{svc.title}</h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#5a6779' }}>{svc.desc}</p>
                    <ul className="space-y-2">
                      {svc.points.map((p, j) => (
                        <li key={j} className="text-sm flex items-center gap-2" style={{ color: '#1a2332' }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#10b981' }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us — Comparison Cards */}
      <section style={{ backgroundColor: '#0a1628' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#34d399' }}>WHY ZAN</span>
            <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ color: '#34d399', fontWeight: 600 }}>
              为什么选择左安
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              不是猎头，不是咨询公司。左安是第三种选择——交付实战能力，而非简历或报告
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: '左安 ZAN',
                  color: '#10b981',
                  items: ['实战顾问推动业务结果', '48h内推荐，1周入场', '按需接入、按效付费', 'AI/产品/增长/组织深耕', '知识转移、能力共建'],
                },
                {
                  name: '传统猎头',
                  color: 'rgba(255,255,255,0.3)',
                  items: ['候选人简历与基本背景', '2-8周寻访周期', '成功入职后一次性收费', '广泛覆盖、通用寻访', '入职后服务终止'],
                },
                {
                  name: '传统咨询公司',
                  color: 'rgba(255,255,255,0.3)',
                  items: ['策略报告与建议方案', '1-3个月立项启动', '固定项目制、高额启动费', '标准化方法论', '报告交付后服务终止'],
                },
              ].map((col) => (
                <div key={col.name} className="p-6 md:p-8" style={{ border: `1px solid ${col.color}`, backgroundColor: col.name === '左安 ZAN' ? 'rgba(16,185,129,0.05)' : 'transparent' }}>
                  <h3 className="text-base font-semibold mb-6" style={{ color: col.name === '左安 ZAN' ? '#10b981' : 'rgba(255,255,255,0.5)' }}>{col.name}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2" style={{ color: col.name === '左安 ZAN' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>
                        <span className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: col.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-xl md:text-2xl mb-4" style={{ color: '#10b981', fontWeight: 400 }}>
              明确需求，是精准匹配的第一步
            </h2>
            <p className="text-sm mb-6" style={{ color: '#5a6779' }}>告诉我们您的业务挑战，左安顾问将协助梳理核心诉求</p>
            <Link to="/find-talent" className="inline-block text-sm px-8 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02]" style={{ backgroundColor: '#10b981' }}>
              招贤纳士
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
