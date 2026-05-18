import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Resources from '@/pages/Resources'
import ResourceDetail from '@/pages/ResourceDetail'
import Join from '@/pages/Join'
import FindTalent from '@/pages/FindTalent'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen" style={{ backgroundColor: '#0d1d35' }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/join" element={<Join />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
