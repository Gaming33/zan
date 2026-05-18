import { Link } from 'react-router';

export default function NotFound() {
  return (
    <main>
      <section className="relative w-full min-h-[80vh] flex items-center justify-center" style={{ backgroundColor: '#0d1d35' }}>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display text-6xl md:text-8xl text-white mb-4" style={{ fontWeight: 700 }}>
            404
          </h1>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            页面未找到
          </p>
          <Link
            to="/"
            className="inline-block text-sm px-8 py-3 text-white tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: '#10b981' }}
          >
            返回首页
          </Link>
        </div>
      </section>
    </main>
  );
}
