import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { UsersThree, Lightning, CheckCircle, ChartLineUp, Books, Handshake, TrendUp, Brain, MagnifyingGlass, Rocket, Buildings, PenNib, GlobeHemisphereWest } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FormAlert from '@/components/FormAlert';
import { talentLeadSchema, type TalentLeadInput } from '@/types/schemas';
import { submitTalentLead } from '@/lib/api';

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

const qualities = [
  { title: '项目制协作', desc: '能够在明确的项目目标与时间框架内，与企业团队高效协同，交付可量化的业务成果。', icon: <UsersThree size={24} weight="duotone" /> },
  { title: '快速融入', desc: '具备在短时间内理解企业业务逻辑、组织文化与关键挑战的能力，迅速进入状态、产生价值。', icon: <Lightning size={24} weight="duotone" /> },
  { title: '项目交付', desc: '拥有经过验证的项目交付方法论，能够系统性推动从诊断、策略制定到执行落地的全流程。', icon: <CheckCircle size={24} weight="duotone" /> },
  { title: '专业输出', desc: '善于将复杂的专业判断转化为企业可理解、可执行的方案，具备跨层级沟通与影响力。', icon: <ChartLineUp size={24} weight="duotone" /> },
  { title: '知识共创', desc: '愿意将实战经验沉淀为可复制的方法论，参与左安的知识生产与内容输出。', icon: <Books size={24} weight="duotone" /> },
  { title: '价值共创', desc: '不仅完成项目交付，更致力于与企业共建长期能力体系，从外部顾问演变为可信赖的战略伙伴。', icon: <Handshake size={24} weight="duotone" /> },
];

export default function Join() {
  const [alertMsg, setAlertMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TalentLeadInput>({
    resolver: zodResolver(talentLeadSchema),
    defaultValues: { name: '', email: '', phone: '', role: '', bio: '' },
  });

  const mutation = useMutation({
    mutationFn: submitTalentLead,
    onSuccess: (data) => {
      setAlertMsg({ message: data.message, type: 'success' });
      reset();
    },
    onError: (error: Error) => {
      setAlertMsg({ message: error.message || '提交失败，请稍后重试', type: 'error' });
    },
  });

  const onSubmit = (values: TalentLeadInput) => mutation.mutate(values);

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-20" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img src="/images/join-banner.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.5, filter: 'saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,29,53,0.7), rgba(13,29,53,0.95))' }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4" style={{ fontWeight: 600 }}>
            人才入席
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            与标杆企业并肩作战，用专业能力解决真正重要的商业问题
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-3xl tracking-widest mb-4" style={{ color: '#10b981', fontWeight: 600 }}>
              成为左安顾问网络的一员
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#5a6779' }}>
              左安连接具有实战验证的高阶人才与面临关键挑战的企业。作为顾问，您将参与最具影响力的项目，与最优秀的团队并肩，同时将个人经验沉淀为可复用的行业知识。
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualities.map((q, i) => (
              <AnimatedSection key={i} className="p-6 group" style={{ backgroundColor: '#f5f7fa', border: '1px solid #e2e6ed' }}>
                <div className="mb-3 transition-transform duration-300 group-hover:scale-110" style={{ color: '#10b981' }}>{q.icon}</div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#1a2332' }}>{q.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5a6779' }}>{q.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section style={{ backgroundColor: '#0a1628' }} className="py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl tracking-widest mb-4" style={{ color: '#34d399', fontWeight: 600 }}>
              我们寻找的顾问画像
            </h2>
          </AnimatedSection>

          <div className="max-w-[1200px] mx-auto">
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { icon: <TrendUp size={24} weight="duotone" />, title: '经验深度', text: '五年以上行业深耕' },
                  { icon: <Brain size={24} weight="duotone" />, title: '专业领域', text: 'AI+产品/增长/组织经营' },
                  { icon: <MagnifyingGlass size={24} weight="duotone" />, title: '诊断能力', text: '独立诊断复杂问题' },
                  { icon: <UsersThree size={24} weight="duotone" />, title: '协作模式', text: '项目制、成果导向' },
                  { icon: <Rocket size={24} weight="duotone" />, title: '创业经历', text: '从零到一搭建业务' },
                  { icon: <Buildings size={24} weight="duotone" />, title: '公司背景', text: '知名咨询/头部大厂' },
                  { icon: <PenNib size={24} weight="duotone" />, title: '内容输出', text: '沉淀专业方法论' },
                  { icon: <GlobeHemisphereWest size={24} weight="duotone" />, title: '跨行业视野', text: '快速迁移方法论' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-5 transition-all duration-300 hover:shadow-md group" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(16,185,129,0.12)' }}>
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}>
                      <span style={{ color: '#10b981' }}>{item.icon}</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1" style={{ color: '#FFFFFF' }}>{item.title}</h4>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Application */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-28 md:py-36">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl tracking-widest mb-3" style={{ color: '#10b981', fontWeight: 600 }}>
              顾问申请
            </h2>
            <p className="text-sm" style={{ color: '#5a6779' }}>
              如果您认同左安的理念并具备上述条件，请提交申请，我们将在五个工作日内完成评估并反馈
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <FormAlert message={alertMsg?.message ?? null} type={alertMsg?.type ?? 'success'} onDismiss={() => setAlertMsg(null)} />
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>姓名 *</label>
                  <input type="text" {...register('name')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>工作邮箱 *</label>
                  <input type="email" {...register('email')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>联系电话</label>
                  <input type="tel" {...register('phone')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>现任职务</label>
                  <input type="text" {...register('role')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                  {errors.role && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.role.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>个人简介与核心经历 *</label>
                <textarea {...register('bio')} rows={5} className="form-input w-full px-4 py-3 text-sm resize-none" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} placeholder="请简要介绍您的专业背景、核心能力领域、代表性项目经历..."></textarea>
                {errors.bio && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.bio.message}</p>}
              </div>
              <div className="text-center pt-3">
                <button type="submit" disabled={mutation.isPending} className="text-sm px-10 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#10b981' }}>
                  {mutation.isPending ? '提交中...' : '提交申请'}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
