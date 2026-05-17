import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { WhyZoan } from '@/pages/WhyZoan'
import { Services } from '@/pages/Services'
import { Process } from '@/pages/Process'
import { Projects } from '@/pages/Projects'
import { Insights } from '@/pages/Insights'
import { InsightDetail } from '@/pages/InsightDetail'
import { Programs } from '@/pages/Programs'
import { EnterpriseContact } from '@/pages/EnterpriseContact'
import { TalentApply } from '@/pages/TalentApply'
import { Privacy } from '@/pages/Privacy'
import { Terms } from '@/pages/Terms'

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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/why-zoan" element={<WhyZoan />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/process" element={<Process />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/enterprise/contact" element={<EnterpriseContact />} />
              <Route path="/talent/apply" element={<TalentApply />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
