import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArticles } from '@/hooks/useArticles';
import { ArticleGridSkeleton } from '@/components/Skeleton';
import type { Article } from '@/types';

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

export default function Resources() {
  const [activeType, setActiveType] = useState('全部');
  const [page, setPage] = useState(1);

  const typeParam = activeType === '全部' ? undefined : activeType;
  const pageSize = 9;

  const { data, isLoading } = useArticles({
    type: typeParam,
    page,
    pageSize,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;
  const items = data?.items ?? [];

  const types = ['全部', '案例研究', '方法论', '人才研究', '实践指南'];

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-20" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img src="/images/tech-talent.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.5, filter: 'saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,29,53,0.7), rgba(13,29,53,0.95))' }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4" style={{ fontWeight: 700 }}>资源智库</h1>
          <p className="text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            高质量企业知识库，聚焦AI+产品、AI+增长、AI+组织及经营的核心洞察
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor: '#f5f7fa', borderBottom: '1px solid #e2e6ed' }} className="py-4">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs" style={{ color: '#10b981' }}>类型</span>
            {types.map(t => (
              <button key={t} onClick={() => { setActiveType(t); setPage(1); }} className="text-xs px-3 py-1.5 transition-all duration-200" style={{ backgroundColor: activeType === t ? '#14b8a6' : 'transparent', color: activeType === t ? '#FFFFFF' : '#5a6779', border: activeType === t ? 'none' : '1px solid #e2e6ed' }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ backgroundColor: '#f5f7fa' }} className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {isLoading ? (
            <ArticleGridSkeleton count={6} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item: Article) => (
                  <Link key={item.id} to={`/resources/${item.id}`}>
                    <AnimatedSection className="p-6 transition-all duration-300 hover:shadow-md group" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs px-2 py-0.5" style={{ color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', backgroundColor: 'rgba(52,211,153,0.05)' }}>{item.type}</span>
                        <span className="text-xs" style={{ color: '#a0aec0' }}>{item.date}</span>
                      </div>
                      <h3 className="text-sm font-medium mb-2 leading-relaxed transition-colors duration-200 group-hover:text-[#10b981]" style={{ color: '#1a2332' }}>{item.title}</h3>
                      <p className="text-xs leading-relaxed mb-4 font-medium" style={{ color: '#5a6779' }}>{item.summary}</p>
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #e2e6ed' }}>
                        <span className="text-xs" style={{ color: '#a0aec0' }}>{item.category}</span>
                        <span className="text-xs transition-all duration-200 group-hover:translate-x-1" style={{ color: '#10b981' }}>→</span>
                      </div>
                    </AnimatedSection>
                  </Link>
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="text-xs px-4 py-2 disabled:opacity-30" style={{ border: '1px solid #e2e6ed', color: '#5a6779' }}>上一页</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)} className="text-xs px-3 py-2 transition-all" style={{ backgroundColor: p === page ? '#10b981' : '#fff', color: p === page ? '#fff' : '#5a6779', border: '1px solid #e2e6ed' }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="text-xs px-4 py-2 disabled:opacity-30" style={{ border: '1px solid #e2e6ed', color: '#5a6779' }}>下一页</button>
                </div>
              )}
              {items.length === 0 && <div className="text-center py-12 text-sm" style={{ color: '#a0aec0' }}>暂无匹配的文章</div>}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
