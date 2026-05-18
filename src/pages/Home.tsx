import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Headset, LockKey } from '@phosphor-icons/react';
import CountUp from '@/components/CountUp';

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

export default function Home() {
  return (
    <main>
      {/* ====== HERO ====== */}
      <section className="relative w-full min-h-[80vh] flex items-end" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.5, filter: 'saturate(0.8)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,29,53,0.88) 0%, rgba(13,29,53,0.65) 50%, rgba(13,29,53,0.45) 100%)' }} />
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(20,184,166,0.1) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 85% 20%, rgba(52,211,153,0.06) 0%, transparent 50%)
            `,
          }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 pb-24 pt-36 w-full">
          <div className="mb-6 opacity-0 animate-hero-title">
            <span className="text-xs tracking-[0.2em] font-medium" style={{ color: '#10b981' }}>
              ZUO AN NEXUS
            </span>
          </div>
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white max-w-2xl mb-4 opacity-0 translate-y-8 animate-hero-title"
            style={{ fontWeight: 700, lineHeight: 1.1 }}
          >
            高阶能力<br />按需获取
          </h1>
          <div className="w-20 h-0.5 mb-8 opacity-0 animate-hero-line" style={{ backgroundColor: '#10b981' }} />
          <p
            className="text-base md:text-lg max-w-xl mb-10 opacity-0 translate-y-6 animate-hero-desc"
            style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}
          >
            汇聚经过严格筛选的咨询顾问、领域专家与高管人才，在企业增长、AI转型、组织升级的关键节点，精准注入所需能力。
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 translate-y-4 animate-hero-btn">
            <Link
              to="/find-talent"
              className="text-sm px-8 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#10b981' }}
            >
              我是企业 · 招贤纳士
            </Link>
            <Link
              to="/join"
              className="text-sm px-8 py-3 tracking-wider transition-all duration-200 hover:bg-[rgba(16,185,129,0.1)]"
              style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              我是顾问 · 人才入席
            </Link>
          </div>
        </div>
      </section>

      {/* ====== COMPETITIVE ADVANTAGE — 左文右图 ====== */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左：文字 */}
            <AnimatedSection>
              <span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#10b981' }}>
                WHY ZAN
              </span>
              <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ color: '#10b981', fontWeight: 600 }}>
                为企业重塑<br />核心竞争优势
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#5a6779' }}>
                当关键项目需要提速、核心岗位出现空缺、转型需要推动力时，内部团队、传统猎头或大型咨询公司往往难以兼顾速度与质量。左安通过"按需对接"模式，让企业在最短时间内获得经过验证的高阶能力。
              </p>
              <div className="space-y-4">
                {[
                  { icon: <ShieldCheck size={22} weight="duotone" color="#10b981" />, title: '严选人才', desc: '一线咨询公司背景，层层筛选' },
                  { icon: <Headset size={22} weight="duotone" color="#10b981" />, title: '全程服务', desc: '从诊断到交付，全程跟进' },
                  { icon: <LockKey size={22} weight="duotone" color="#10b981" />, title: '规范保障', desc: '信息安全对标行业最高标准' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium" style={{ color: '#1a2332' }}>{item.title}</h4>
                      <p className="text-xs" style={{ color: '#5a6779' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            {/* 右：图片 */}
            <AnimatedSection>
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  src="/images/service-onsite.jpg"
                  alt=""
                  className="w-full h-80 lg:h-[420px] object-cover"
                  style={{ filter: 'saturate(0.85)' }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ====== SERVICES OVERVIEW ====== */}
      <section style={{ backgroundColor: '#0a1628' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#34d399' }}>
              SERVICES
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-white" style={{ fontWeight: 600 }}>
              灵活获取所需的高阶能力
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '01', title: '按需人才', desc: '针对具体业务问题，按阶段、按职能精准匹配顾问，灵活配置、按效付费。' },
                { num: '02', title: '临时高管', desc: '在关键管理岗位空缺或变革期，引入经验丰富的临时高管，保障业务连续性。' },
                { num: '03', title: '项目制专家', desc: '围绕AI转型落地、产品体系重构、增长模型搭建等复杂项目，组建专项团队。' },
              ].map((item) => (
                <div key={item.num} className="p-8" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div className="text-xs tracking-widest mb-4" style={{ color: '#34d399' }}>{item.num}</div>
                  <h3 className="text-base font-medium mb-3 text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(160,190,245,0.6)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-10">
            <Link to="/services" className="inline-block text-sm px-8 py-3 border transition-all duration-200 hover:bg-[#10b981] hover:text-white hover:border-[#10b981]" style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#34d399' }}>
              查看全部服务
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== DATA — 简洁大字 ====== */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#10b981' }}>
              TRUSTED BY NUMBERS
            </span>
            <h2 className="font-display text-2xl md:text-3xl" style={{ color: '#10b981', fontWeight: 600 }}>
              用数据说话
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { num: '48h', label: '平均响应', desc: '从需求到首轮推荐' },
                { num: '500+', label: '认证顾问', desc: '覆盖AI/产品/增长/组织' },
                { num: '95%', label: '交付达标率', desc: '经企业验收' },
                { num: '80%', label: '成本优化', desc: '相比传统咨询' },
              ].map((stat) => (
                <div key={stat.num} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#10b981' }}>
                    <CountUp end={stat.num} duration={1.5} />
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#1a2332' }}>{stat.label}</div>
                  <div className="text-xs" style={{ color: '#5a6779' }}>{stat.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== DUAL CTA ====== */}
      <section style={{ backgroundColor: '#0d1d35' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#34d399' }}>
              GET STARTED
            </span>
            <h2 className="font-display text-xl md:text-2xl text-white mb-3" style={{ fontWeight: 500 }}>
              选择您的身份
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              左安连接企业关键需求与验证过的高阶能力
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/find-talent" className="text-sm px-10 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02]" style={{ backgroundColor: '#10b981' }}>
              我是企业 · 招贤纳士
            </Link>
            <Link to="/join" className="text-sm px-10 py-3 tracking-wider transition-all duration-200 hover:bg-[rgba(16,185,129,0.1)]" style={{ color: '#FFFFFF', border: '1px solid rgba(16,185,129,0.4)' }}>
              我是顾问 · 人才入席
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
