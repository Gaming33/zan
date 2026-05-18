export function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-44 mb-4" style={{ backgroundColor: '#e2e6ed' }} />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-4" style={{ backgroundColor: '#e2e6ed' }} />
        <div className="w-16 h-4" style={{ backgroundColor: '#e2e6ed' }} />
      </div>
      <div className="w-3/4 h-5 mb-2" style={{ backgroundColor: '#e2e6ed' }} />
      <div className="w-full h-3 mb-1" style={{ backgroundColor: '#e2e6ed' }} />
      <div className="w-2/3 h-3" style={{ backgroundColor: '#e2e6ed' }} />
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
