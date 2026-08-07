import { useEffect, useRef, type ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import { I18nProvider } from './i18n'
import Community from './pages/Community'
import Landing from './pages/Landing'
import Plan from './pages/Plan'
import Trip from './pages/Trip'
import './App.css'

function RouteFade({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigationType = useNavigationType()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const root = document.documentElement
    if (
      'startViewTransition' in document &&
      typeof document.startViewTransition === 'function' &&
      navigationType !== 'POP'
    ) {
      document.startViewTransition(() => {
        root.dataset.route = location.pathname
      })
    } else {
      root.dataset.route = location.pathname
    }
  }, [location.pathname, navigationType])

  return children
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

  return (
    <I18nProvider>
      <BrowserRouter basename={basename}>
        <RouteFade>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/trip/xian" element={<Trip />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteFade>
      </BrowserRouter>
    </I18nProvider>
  )
}
