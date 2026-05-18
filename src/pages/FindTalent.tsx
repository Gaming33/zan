import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardText, UserFocus, Users, Handshake } from '@phosphor-icons/react';
import FormAlert from '@/components/FormAlert';
import { enterpriseLeadSchema, type EnterpriseLeadInput } from '@/types/schemas';
import { submitEnterpriseLead } from '@/lib/api';

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

export default function FindTalent() {
  const [alertMsg, setAlertMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<EnterpriseLeadInput>({
    resolver: zodResolver(enterpriseLeadSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', role: '', stage: '', challenge: '', timeline: '' },
  });

  const roleVal = watch('role');
  const stageVal = watch('stage');
  const timelineVal = watch('timeline');

  const mutation = useMutation({
    mutationFn: submitEnterpriseLead,
    onSuccess: (data) => {
      setAlertMsg({ message: data.message, type: 'success' });
      reset();
    },
    onError: (error: Error) => {
      setAlertMsg({ message: error.message || '提交失败，请稍后重试', type: 'error' });
    },
  });

  const onSubmit = (values: EnterpriseLeadInput) => mutation.mutate(values);

  return (
    <main>
      <section className="relative w-full pt-32 pb-20" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img src="/images/findtalent-hero.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.45, filter: 'saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,29,53,0.7), rgba(13,29,53,0.95))' }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4" style={{ fontWeight: 700 }}>招贤纳士</h1>
          <p className="text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            先厘清问题，再匹配人才。告诉我们您面临的挑战，我们将精准推荐最合适的高阶能力
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#f5f7fa', borderBottom: '1px solid #e2e6ed' }} className="py-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ClipboardText size={22} weight="duotone" />, step: '01', title: '需求梳理', desc: '左安顾问协助诊断业务现状与核心诉求' },
              { icon: <UserFocus size={22} weight="duotone" />, step: '02', title: '能力画像', desc: '基于问题本质绘制所需高阶能力画像' },
              { icon: <Users size={22} weight="duotone" />, step: '03', title: '人选推荐', desc: '48小时内推荐经严格筛选的顾问人选' },
              { icon: <Handshake size={22} weight="duotone" />, step: '04', title: '启动协作', desc: '协助双方对齐目标，快速启动项目' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <span style={{ color: '#10b981' }}>{item.icon}</span>
                </div>
                <div className="text-xs font-medium mb-1" style={{ color: '#10b981' }}>{item.step}</div>
                <div className="text-sm font-medium mb-1" style={{ color: '#1a2332' }}>{item.title}</div>
                <div className="text-xs" style={{ color: '#5a6779' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* 左侧表单 */}
            <div className="lg:col-span-3">
              <AnimatedSection className="mb-10">
                <h2 className="font-display text-xl md:text-2xl mb-2" style={{ color: '#10b981', fontWeight: 600 }}>填写需求信息</h2>
                <p className="text-sm" style={{ color: '#5a6779' }}>信息越详尽，匹配越精准</p>
              </AnimatedSection>

              <AnimatedSection>
                <FormAlert message={alertMsg?.message ?? null} type={alertMsg?.type ?? 'success'} onDismiss={() => setAlertMsg(null)} />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>姓名 *</label>
                      <input type="text" {...register('name')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                      {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>公司名称</label>
                      <input type="text" {...register('company')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                      {errors.company && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>工作邮箱 *</label>
                      <input type="email" {...register('email')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                      {errors.email && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>联系电话</label>
                      <input type="tel" {...register('phone')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} />
                      {errors.phone && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>目标岗位类型</label>
                      <select {...register('role')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: roleVal ? '#1a2332' : '#a0aec0' }}>
                        <option value="">请选择</option>
                        <option value="CEO / 总经理">CEO / 总经理</option>
                        <option value="CTO / 技术负责人">CTO / 技术负责人</option>
                        <option value="CPO / 产品负责人">CPO / 产品负责人</option>
                        <option value="增长负责人">增长负责人</option>
                        <option value="组织发展负责人">组织发展负责人</option>
                        <option value="其他">其他</option>
                      </select>
                      {errors.role && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.role.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>企业当前阶段</label>
                      <select {...register('stage')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: stageVal ? '#1a2332' : '#a0aec0' }}>
                        <option value="">请选择</option>
                        <option value="种子期 / 天使轮">种子期 / 天使轮</option>
                        <option value="早期 / A-B轮">早期 / A-B轮</option>
                        <option value="成长期 / C轮后">成长期 / C轮后</option>
                        <option value="成熟期 / 上市">成熟期 / 上市</option>
                        <option value="转型期">转型期</option>
                      </select>
                      {errors.stage && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.stage.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>当前面临的核心挑战 *</label>
                    <textarea {...register('challenge')} rows={5} className="form-input w-full px-4 py-3 text-sm resize-none" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: '#1a2332' }} placeholder="请描述当前业务面临的关键问题、期望引入外部能力解决的核心诉求..."></textarea>
                    {errors.challenge && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.challenge.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#5a6779' }}>期望到岗时间</label>
                    <select {...register('timeline')} className="form-input w-full px-4 py-3 text-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed', color: timelineVal ? '#1a2332' : '#a0aec0' }}>
                      <option value="">请选择（可选）</option>
                      <option value="尽快">尽快</option>
                      <option value="1个月内">1个月内</option>
                      <option value="3个月内">3个月内</option>
                      <option value="时间灵活">时间灵活</option>
                    </select>
                    {errors.timeline && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.timeline.message}</p>}
                  </div>
                  <div className="text-center pt-3">
                    <button type="submit" disabled={mutation.isPending} className="text-sm px-10 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#10b981' }}>
                      {mutation.isPending ? '提交中...' : '提交需求'}
                    </button>
                    <p className="text-xs mt-4" style={{ color: '#a0aec0' }}>提交后，左安顾问将在24小时内与您联系进行需求诊断。</p>
                  </div>
                </form>
              </AnimatedSection>
            </div>

            {/* 右侧视觉 — 仅桌面端 */}
            <div className="hidden lg:block lg:col-span-2">
              <AnimatedSection>
                <div className="sticky top-32">
                  <div className="rounded-sm overflow-hidden" style={{ border: '1px solid #e2e6ed' }}>
                    <img src="/images/service-onsite.jpg" alt="专业办公环境" className="w-full object-cover" style={{ height: '320px' }} />
                  </div>
                  <div className="mt-6 p-5 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed' }}>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#1a2332' }}>顾问覆盖领域</h4>
                    <div className="flex flex-wrap gap-2">
                      {['AI与数字化', '产品与增长', '组织与人才', '战略规划', '技术架构', '运营提效'].map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-sm" style={{ backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.12)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 p-5 rounded-sm" style={{ backgroundColor: '#0d1d35' }}>
                    <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>平均响应时间</p>
                    <p className="text-2xl font-bold" style={{ color: '#10b981' }}>48h</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>从需求提交到首轮人选推荐</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
