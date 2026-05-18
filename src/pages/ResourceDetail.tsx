import { useParams, useNavigate, Link } from 'react-router';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactMarkdown from 'react-markdown';
import { useArticle, useArticles } from '@/hooks/useArticles';
import type { Article } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSection({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = Number(id);
  const validId = !isNaN(articleId) ? articleId : undefined;

  const { data: article, isLoading } = useArticle(validId);
  const { data: allArticles } = useArticles({});
  const related = allArticles?.items?.filter((a: Article) => a.id !== articleId).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <main style={{ backgroundColor: '#f5f7fa' }} className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-6 h-6 border border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
      </main>
    );
  }

  if (!article) {
    return (
      <main style={{ backgroundColor: '#f5f7fa' }} className="min-h-screen pt-32">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-xl mb-4" style={{ color: '#1a2332' }}>文章未找到</h2>
          <Link to="/resources" className="text-sm" style={{ color: '#10b981' }}>← 返回资源智库</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#f5f7fa' }}>
      {/* Hero */}
      <section className="relative w-full pt-28 pb-12" style={{ backgroundColor: '#0d1d35' }}>
        <div className="absolute inset-0">
          <img src={article.hero_image} alt="" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,29,53,0.7), rgba(13,29,53,0.95))' }} />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          <button onClick={() => navigate('/resources')} className="text-xs mb-6 inline-flex items-center gap-1 transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>
            ← 返回资源智库
          </button>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-0.5" style={{ color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', backgroundColor: 'rgba(52,211,153,0.1)' }}>{article.type}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{article.category}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{article.date}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-4" style={{ fontWeight: 600, lineHeight: 1.3 }}>
            {article.title}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
            {article.summary}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <AnimatedSection className="p-8 md:p-10" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed' }}>
            <div className="rich-text-content prose-article">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h2 className="font-display text-lg md:text-xl pt-4 mb-4 mt-8 first:mt-0" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>{children}</h2>,
                  h2: ({ children }) => <h2 className="font-display text-lg md:text-xl pt-4 mb-4 mt-8 first:mt-0" style={{ color: '#1a2332', fontWeight: 600, borderTop: '1px solid #e2e6ed' }}>{children}</h2>,
                  h3: ({ children }) => <h3 className="font-display text-base md:text-lg mb-3 mt-6" style={{ color: '#1a2332', fontWeight: 600 }}>{children}</h3>,
                  p: ({ children }) => <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d4a5c' }}>{children}</p>,
                  ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="space-y-2 mb-4 list-decimal list-inside">{children}</ol>,
                  li: ({ children }) => (
                    <li className="text-sm flex items-start gap-2" style={{ color: '#3d4a5c' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: '#10b981' }} />
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => <blockquote className="pl-4 italic text-sm mb-4" style={{ borderLeft: '3px solid #10b981', color: '#5a6779' }}>{children}</blockquote>,
                  code: ({ children }) => <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f0f2f5', color: '#10b981' }}>{children}</code>,
                  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{children}</a>,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Divider */}
            <div className="mt-12 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #e2e6ed' }}>
              <span className="text-xs" style={{ color: '#a0aec0' }}>左安 · {article.date}</span>
              <div className="flex items-center gap-4">
                <button onClick={() => { navigator.clipboard.writeText(window.location.href).then(() => alert('链接已复制到剪贴板')).catch(() => alert('复制失败')); }} className="text-xs transition-colors duration-200 hover:text-[#10b981]" style={{ color: '#a0aec0' }}>分享</button>
                <button onClick={() => alert('感谢收藏')} className="text-xs transition-colors duration-200 hover:text-[#10b981]" style={{ color: '#a0aec0' }}>收藏</button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Consult CTA */}
      <section className="pb-8">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="p-6 md:p-8 text-center" style={{ backgroundColor: '#0a1628', border: '1px solid rgba(16,185,129,0.15)' }}>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>如果您在文章中看到了与自身业务相关的挑战</p>
            <h3 className="font-display text-lg text-white mb-5" style={{ fontWeight: 600 }}>欢迎与左安顾问聊聊</h3>
            <Link
              to="/find-talent"
              className="inline-block text-sm px-8 py-2.5 text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#10b981' }}
            >
              预约顾问沟通
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          <h3 className="text-sm font-semibold tracking-widest mb-6" style={{ color: '#1a2332' }}>相关阅读</h3>
          <div className="flex flex-col gap-4">
            {related.map((item: Article) => (
              <Link
                key={item.id}
                to={`/resources/${item.id}`}
                className="flex items-start justify-between gap-4 p-4 transition-all duration-200 hover:shadow-sm group"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e6ed' }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-1.5 py-0.5" style={{ color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', backgroundColor: 'rgba(52,211,153,0.05)' }}>{item.type}</span>
                    <span className="text-xs" style={{ color: '#a0aec0' }}>{item.category}</span>
                  </div>
                  <h4 className="text-sm font-medium transition-colors duration-200 group-hover:text-[#10b981]" style={{ color: '#1a2332' }}>{item.title}</h4>
                </div>
                <span className="text-sm shrink-0" style={{ color: '#a0aec0' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
